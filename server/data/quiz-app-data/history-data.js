/** Data layer.
 * @module data/historyData
 */

import pool from './pool.js';

/**
 * Data layer related on history.
 * @type { object }
 * @const
 * @namespace historyData
 */

/**
 * Gets the history, matching the search.
 * @author Mayya Markova
 * @memberof module:data/historyData~historyData
 * @async
 * @param { string|number } userID Search parameter: the user's ID.
 * @param { string|undefined } quiz Search parameter: the quiz's name.
 * @returns { Promise<object> } The matching results.
 */
const searchBy = async (userID, quiz) => {
  let historySql = `
    SELECT h.id, q.name, c.category, h.started, h.finished, h.score
    FROM history h
    JOIN quizes q ON q.id = h.quizID
    JOIN categories c ON q.categoryID = c.id
    WHERE h.userID = ?
  `;

  if (quiz) {
    historySql += ` AND q.name LIKE '%${quiz}%'`;
  }

  historySql += ' ORDER BY h.finished DESC';

  return await pool.query(historySql, [userID]);
};

/**
 * Gets the history, matching the search.
 * @author Mayya Markova
 * @memberof module:data/historyData~historyData
 * @async
 * @param { string|number } userID Search parameter: the user's ID.
 * @param { string|undefined } quiz Search parameter: the quiz's name.
 * @param { number|undefined } offset Search parameter: the offset number.
 * @param { number|undefined } limit Search parameter: the number of results per page.
 * @returns { Promise<object> } The matching results.
 */
const searchByWithPages = async (userID, quiz, offset, limit) => {
  let historySql = `
    SELECT h.id, q.name, c.category, h.started, h.finished, h.score
    FROM history h
    JOIN quizes q ON q.id = h.quizID
    JOIN categories c ON q.categoryID = c.id
    WHERE h.userID = ?
  `;

  if (quiz) {
    historySql += ` AND q.name LIKE '%${quiz}%'`;
  }

  historySql += ' ORDER BY h.finished DESC';

  if (offset !== undefined && limit) {
    historySql += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  return await pool.query(historySql, [userID]);
};

/**
 * Returns the student's result if he/she has already solved the quiz or null-s if not.
 * @author Mayya Markova
 * @memberof module:data/historyData~historyData
 * @async
 * @param { string|number } userID The ID of the user.
 * @param { string|number } quizID The ID of the quiz.
 * @returns { Promise<object> } The history or null.
 */
const getSolveInfo = async (userID, quizID) => {
  const historySql = `
    SELECT *
    FROM history
    WHERE userID = ? AND quizID = ?;
  `;

  const historyData = await pool.query(historySql, [userID, quizID]);
  return historyData?.[0];
};

/**
 * Logs that the student has started solving the given quiz.
 * @author Mayya Markova
 * @memberof module:data/historyData~historyData
 * @async
 * @param { string|number } userID The ID of the user.
 * @param { string|number } quizID The ID of the quiz.
 * @returns { Promise<object> } The start time.
 */
const logStartSolving = async (userID, quizID) => {
  const startTime = new Date();

  const insertSql = `
    INSERT INTO history (userID, quizID, started)
    VALUES (?, ?, ?);
  `;

  const _ = await pool.query(insertSql, [userID, quizID, startTime]);
  return startTime;
};

const logFinishSolving = async (id, finishTime) => {
  const insertSql = `
    UPDATE history SET
     finished = ?
    WHERE id = ?
  `;

  try {
    await pool.query(insertSql, [finishTime, id]);
    return true;
  }
  catch (err){
    console.log(`db update failed ${err.message}`);
    return false;
  }
};

const logQuizScore = async (id, score) => {
  const insertSql = `
    UPDATE history SET
     score = ?
    WHERE id = ?
  `;

  try {
    await pool.query(insertSql, [score, id]);
    return true;
  }
  catch (err){
    console.log(`db update failed ${err.message}`);
    return false;
  }
};

const searchByQuizIdPaged = async (quizId, offset, limit) => {
  const countEntriesSql = 'SELECT count(*) AS count';
  const historySql = 'SELECT users.username, users.firstName, users.lastName, history.started, history.score';
  const searchBySql = `
    FROM quiz.history
    JOIN quizes ON quizes.id = history.quizID
    JOIN users ON users.id = history.userID
    WHERE history.quizID = ?
  `;
  let withLimit = '';

  if (offset !== undefined && limit) {
    withLimit = ` LIMIT ${limit} OFFSET ${offset}`;
  }
  try {
    const queryResults = await Promise.all([
      pool.query(historySql + searchBySql + withLimit, [quizId]),
      pool.query(countEntriesSql + searchBySql, [quizId]),
    ]);
    return {
      history: queryResults[0],
      entriesCount: queryResults[1][0].count,
    };
  }
  catch (err){
    console.log(`db select failed ${err.message}`);
    return null;
  }
};

export default {
  searchBy,
  searchByWithPages,
  getSolveInfo,
  logStartSolving,
  logFinishSolving,
  logQuizScore,
  searchByQuizIdPaged,
};
