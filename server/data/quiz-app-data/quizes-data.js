/** Data layer.
 * @module data/quizesData
 */

import pool from './pool.js';

/**
 * Data layer related on quizes.
 * @type { object }
 * @const
 * @namespace quizesData
 */

/**
 * Gets quizes, matching the search.
 * @author Mayya Markova
 * @memberof module:data/quizesData~quizesData
 * @async
 * @param { string|undefined } category Search parameter: the category's name.
 * @param { string|undefined } teacher Search parameter: the author's name.
 * @returns { Promise<object> } The matching quizes.
 */
const searchBy = async (category, teacher) => {
  let quizesSql = `
    SELECT q.id, q.name, c.category, q.time, u.avatar, u.username, u.firstName, u.lastName
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

/**
 * Gets quizes on page, matching the search.
 * @author Mayya Markova
 * @memberof module:data/quizesData~quizesData
 * @async
 * @param { number|undefined } offset Search parameter: the offset number.
 * @param { number|undefined } limit Search parameter: the number of quizes per page.
 * @param { string|undefined } category Search parameter: the category's name.
 * @param { string|undefined } teacher Search parameter: the author's name.
 * @param { object } user An object with information about the user.
 * @returns { Promise<object> } The matching quizes and if the page parameter
 * is defined- page information.
 */
const searchByWithPages = async (category, teacher, offset, limit, user) => {
  if (user.role === 'teacher') {
    let quizesSql = `
      SELECT q.id, q.name, c.category, q.time, u.avatar, u.username, u.firstName, u.lastName
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
  } else {
    let quizesSql = `
      SELECT q.id, q.name, c.category, q.time, u.avatar, u.username, u.firstName, u.lastName, h.finished
      FROM quizes q
      JOIN users u ON q.teacherID = u.id
      JOIN categories c ON q.categoryID = c.id
      LEFT JOIN history h on h.quizID = q.id
      AND h.userID = ${user.id}
    `;

    if (category) {
      quizesSql += ` WHERE c.category LIKE '%${category}%'`;
    }
    quizesSql += `
      ORDER BY h.finished ASC, q.name ASC
    `;

    if (offset !== undefined && limit) {
      quizesSql += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    return await pool.query(quizesSql);
  }
};

/**
 * Gets a quiz by its ID.
 * @author Mayya Markova
 * @memberof module:data/quizesData~quizesData
 * @async
 * @param { string|number } quizID The ID of the quiz.
 * @returns { Promise<object> } The quiz with its questions and answers or null.
 */
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
      SELECT id, questionID as questionId, text, isTrue
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
