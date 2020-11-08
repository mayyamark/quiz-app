import pool from './pool.js';

const searchBy = async (category, teacher) => {
  let quizesSql = `
    select q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    from quizes q
    join users u on q.teacherID = u.id
    join categories c on q.categoryID = c.id
  `;

  if (category) {
    quizesSql += ` and c.category like '%${category}%'`;
  }
  if (teacher) {
    quizesSql += ` 
      and u.username like  '%${teacher}%'
      order by q.id desc
    `;
  } else {
    quizesSql += ' order by q.name asc';
  }

  return await pool.query(quizesSql);
};  

const searchByWithPages = async (category, teacher, offset, limit) => {
  let quizesSql = `
    select q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    from quizes q
    join users u on q.teacherID = u.id
    join categories c on q.categoryID = c.id
  `;

  if (category) {
    quizesSql += ` and c.category like '%${category}%'`;
  }
  if (teacher) {
    quizesSql += ` 
      and u.username like  '%${teacher}%'
      order by q.id desc
    `;
  } else {
    quizesSql += ' order by q.name asc';
  }

  if (offset !== undefined && limit) {
    quizesSql += ` limit ${limit} offset ${offset}`;
  }
  
  return await pool.query(quizesSql);
};

const getById = async (quizID) => {
  const quizSql = `
    select q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    from quizes q
    join users u on q.teacherID = u.id
    join categories c on q.categoryID = c.id
    where q.id = ?
  `;

  const quizData = await pool.query(quizSql, [quizID]);

  if (!quizData[0]) {
    return null;
  }

  const questionsSql = `
    select id, points, text
    from questions
    where quizID = ?
  `;

  const questionsData = await pool.query(questionsSql, [quizID]);

  await Promise.all(questionsData.map(async el => {
    const answersSql = `
      select id, text, isTrue
      from answers
      where questionID = ?
    `;

    const answersData = await pool.query(answersSql, [el.id]);
    return el.answers = await answersData;
  }));

  quizData[0].questions = questionsData;
  return quizData?.[0];
};

const create = async (name, time, teacher, category) => {
  const insertQuiz = `
      INSERT INTO quizes (name, time, teacherID, categoryID) 
      VALUES (?, ?, ?, ?);
  `;
  
  try {
      const result = await pool.query(
          insertQuiz, 
          [name, time, teacher.id, category.id],
      );

      return {
          id: result.insertId,
          name: name,
          time: time, 
          teacher: teacher,
          category: category,
      };
  }
  catch (err) {
      console.log(`db insert failed ${err.message}`);
      return null;
  }
};

export default {
  searchBy,
  searchByWithPages,
  getById,
  create,
};
