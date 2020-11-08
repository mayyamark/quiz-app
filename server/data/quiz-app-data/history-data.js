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

const logFinishSolving = async (id, finishTime) => {
  const insertSql = `
    UPDATE history SET finished = ? WHERE id = ?
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
    UPDATE history SET score = ? WHERE id = ?
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

export default {
  searchBy,
  searchByWithPages,
  getSolveInfo,
  logStartSolving,
  logFinishSolving,
  logQuizScore,
};
