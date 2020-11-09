import pool from './pool.js';

const createUser = async (username, password, firstName, lastName, avatar) => {
  const insertSql = `
    INSERT INTO users(username, password, firstName, lastName, roleID, registerDate, avatar)
    VALUES (?, ?, ?, ?, 2, ?, ?)
  `;

  const insertData = await pool.query(insertSql, [username, password, firstName, lastName, new Date(), avatar]);

  return {
    id: insertData.insertId,
    username,
    firstName,
    lastName,
    avatar,
  };
};

const getByUsername = async (username) => {
  const userSql = `
    SELECT u.id, u.username, u.password, u.firstName, u.lastName, r.role, u.avatar  
    FROM users u
    JOIN roles r ON u.roleID = r.id
    WHERE username = ?
  `;
  
  const userData = await pool.query(userSql, [username]);
  return userData[0];
};

const searchBy = async (username) => {
  let usersSql = `
    SELECT u.id, u.avatar, u.username, u.firstName, u.lastName, 
    (SELECT SUM(score) FROM history h WHERE h.userID = u.id) AS totalScore
    FROM users u
    WHERE u.roleID = 2
  `;

  if (username) {
    usersSql += ` AND u.username LIKE '%${username}%'`;
  }

  usersSql += ' ORDER BY totalScore DESC';

  return await pool.query(usersSql);
};

const searchByWithPages = async (username, offset, limit) => {
  let usersSql = `
    SELECT u.id, u.avatar, u.username, u.firstName, u.lastName, 
    (SELECT SUM(score) FROM history h WHERE h.userID = u.id) AS totalScore
    FROM users u
    WHERE u.roleID = 2
  `;

  if (username) {
    usersSql += ` AND u.username LIKE '%${username}%'`;
  }

  usersSql += ' ORDER BY totalScore DESC';
  
  if (offset !== undefined && limit) {
    usersSql += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  return await pool.query(usersSql);
};

export default {
  createUser,
  getByUsername,
  searchBy,
  searchByWithPages,
};
