import pool from './pool.js';

const searchBy = async (userID, quiz) => {
  let historySql = `
    select h.id, q.name, c.category, h.started, h.finished, h.score
    from history h
    join quizes q on q.id = h.quizID
    join categories c on q.categoryID = c.id
    where h.userID = ?
  `;

  if (quiz) {
    historySql += ` and q.name like '%${quiz}%'`;
  }

  historySql += ' order by h.finished desc';

  return await pool.query(historySql, [userID]);
};

const searchByWithPages = async (userID, quiz, offset, limit) => {
  let historySql = `
    select h.id, q.name, c.category, h.started, h.finished, h.score
    from history h
    join quizes q on q.id = h.quizID
    join categories c on q.categoryID = c.id
    where h.userID = ?
  `;

  if (quiz) {
    historySql += ` and q.name like '%${quiz}%'`;
  }

  historySql += ' order by h.finished desc';
  
  if (offset !== undefined && limit) {
    historySql += ` limit ${limit} offset ${offset}`;
  }

  return await pool.query(historySql, [userID]);
};

const getSolveInfo = async (userID, quizID) => {
  const historySql = `
    select * 
    from history
    where userID = ? and quizID = ?;
  `;

  const historyData = await pool.query(historySql, [userID, quizID]);
  return historyData?.[0];
};

const logStartSolving = async (userID, quizID) => {
  const startTime = new Date();

  const insertSql = `
    insert into history(userID, quizID, started)
    values (?, ?, ?);
  `;

  const _ = await pool.query(insertSql, [userID, quizID, startTime]);
  return startTime;
};

export default {
  searchBy,
  searchByWithPages,
  getSolveInfo,
  logStartSolving,
};
