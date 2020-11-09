import pool from './pool.js';

const searchBy = async (category, teacher) => {
  let quizesSql = `
    SELECT q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    FROM quizes q
    JOIN users u ON q.teacherID = u.id
    JOIN categories c ON q.categoryID = c.id
  `;

  if (category) {
    quizesSql += ` AND c.category LIKE '%${category}%'`;
  }
  if (teacher) {
    quizesSql += ` 
      AND u.username LIKE  '%${teacher}%'
      ORDER BY q.id DESC
    `;
  } else {
    quizesSql += ' ORDER BY q.name ASC';
  }

  return await pool.query(quizesSql);
};  

const searchByWithPages = async (category, teacher, offset, limit) => {
  let quizesSql = `
    SELECT q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    FROM quizes q
    JOIN users u ON q.teacherID = u.id
    JOIN categories c ON q.categoryID = c.id
  `;

  if (category) {
    quizesSql += ` AND c.category LIKE '%${category}%'`;
  }
  if (teacher) {
    quizesSql += ` 
      AND u.username LIKE  '%${teacher}%'
      ORDER BY q.id DESC
    `;
  } else {
    quizesSql += ' ORDER BY q.name ASC';
  }

  if (offset !== undefined && limit) {
    quizesSql += ` LIMIT ${limit} OFFSET ${offset}`;
  }
  
  return await pool.query(quizesSql);
};

const getById = async (quizID) => {
  const quizSql = `
    SELECT q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    FROM quizes q
    JOIN users u ON q.teacherID = u.id
    JOIN categories c ON q.categoryID = c.id
    WHERE q.id = ?
  `;

  const quizData = await pool.query(quizSql, [quizID]);

  if (!quizData[0]) {
    return null;
  }

  const questionsSql = `
    SELECT id, points, text
    FROM questions
    WHERE quizID = ?
  `;

  const questionsData = await pool.query(questionsSql, [quizID]);

  await Promise.all(questionsData.map(async el => {
    const answersSql = `
      SELECT id, text, isTrue
      FROM answers
      WHERE questionID = ?
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
