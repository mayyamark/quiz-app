/** Data layer.
 * @module data/quizzesData
 */

import pool from './pool.js';

/**
 * Data layer related on quizzes.
 * @type { object }
 * @const
 * @namespace quizzesData
 */

/**
 * Gets quizzes, matching the search.
 * @author Mayya Markova
 * @memberof module:data/quizzesData~quizzesData
 * @async
 * @param { string|undefined } category Search parameter: the category's name.
 * @param { string|undefined } teacher Search parameter: the author's name.
 * @returns { Promise<object> } The matching quizzes.
 */
const searchBy = async (category, teacher) => {
  let quizzesSql = `
    SELECT q.id, q.name, c.category, q.time, u.avatar, u.username, u.firstName, u.lastName
    FROM quizzes q
    JOIN users u ON q.teacherID = u.id
    JOIN categories c ON q.categoryID = c.id
  `;

  if (category) {
    quizzesSql += ` AND c.category LIKE '${category}'`;
  }
  if (teacher) {
    quizzesSql += `
      AND u.username LIKE  '%${teacher}%'
      ORDER BY q.id DESC
    `;
  } else {
    quizzesSql += ' ORDER BY q.name ASC';
  }

  return await pool.query(quizzesSql);
};

/**
 * Gets quizzes on page, matching the search.
 * @author Mayya Markova
 * @memberof module:data/quizzesData~quizzesData
 * @async
 * @param { number|undefined } offset Search parameter: the offset number.
 * @param { number|undefined } limit Search parameter: the number of quizzes per page.
 * @param { string|undefined } category Search parameter: the category's name.
 * @param { string|undefined } teacher Search parameter: the author's name.
 * @param { object } user An object with information about the user.
 * @returns { Promise<object> } The matching quizzes and if the page parameter
 * is defined- page information.
 */
const searchByWithPages = async (category, teacher, offset, limit, user) => {
  if (user.role === 'teacher') {
    let quizzesSql = `
      SELECT q.id, q.name, c.category, q.time, u.avatar, u.username, u.firstName, u.lastName
      FROM quizzes q
      JOIN users u ON q.teacherID = u.id
      JOIN categories c ON q.categoryID = c.id
    `;

    if (category) {
      quizzesSql += ` AND c.category LIKE '${category}'`;
    }
    if (teacher) {
      quizzesSql += `
        AND u.username LIKE  '%${teacher}%'
        ORDER BY q.id DESC
      `;
    } else {
      quizzesSql += ' ORDER BY q.name ASC';
    }

    if (offset !== undefined && limit) {
      quizzesSql += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    return await pool.query(quizzesSql);
  } else {
    let quizzesSql = `
      SELECT q.id, q.name, c.category, q.time, u.avatar, u.username, u.firstName, u.lastName, h.started
      FROM quizzes q
      JOIN users u ON q.teacherID = u.id
      JOIN categories c ON q.categoryID = c.id
      LEFT JOIN history h on h.quizID = q.id
      AND h.userID = ${user.id}
    `;

    if (category) {
      quizzesSql += ` WHERE c.category LIKE '${category}'`;
    }
    quizzesSql += `
      ORDER BY h.started ASC, q.name ASC
    `;

    if (offset !== undefined && limit) {
      quizzesSql += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    return await pool.query(quizzesSql);
  }
};

/**
 * Gets a quiz by its ID.
 * @author Mayya Markova
 * @memberof module:data/quizzesData~quizzesData
 * @async
 * @param { string|number } quizID The ID of the quiz.
 * @returns { Promise<object> } The quiz with its questions and answers or null.
 */
const getById = async (quizID) => {
  const quizSql = `
    SELECT q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    FROM quizzes q
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
      INSERT INTO quizzes (name, time, teacherID, categoryID)
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
