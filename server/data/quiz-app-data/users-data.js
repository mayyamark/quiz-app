/** Data layer.
 * @module data/usersData
 */

import pool from './pool.js';

/**
 * Data layer related on users.
 * @type { object }
 * @const
 * @namespace usersData
 */

/**
 * Registrates a new user.
 * @author Mayya Markova
 * @memberof module:data/usersData~usersData
 * @async
 * @param { string } username The new user's username.
 * @param { string } password The new user's hashed password.
 * @param { string } firstName The new user's first name.
 * @param { string } lastName The new user's last name.
 * @param { string } avatar The new user's avatar.
 * @returns { object } The new user's data.
 */
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

/**
 * Gets a user by his username.
 * @author Mayya Markova
 * @memberof module:data/usersData~usersData
 * @async
 * @param { string } username The user's username.
 * @returns { Promise<object> } The user's data.
 */
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

/**
 * Gets users, matching the search.
 * @author Mayya Markova
 * @memberof module:data/usersData~usersData
 * @async
 * @param { string|undefined } username Search parameter: a users's username.
 * @returns { Promise<object> } The matching users.
 */
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

/**
 * Gets users, matching the search.
 * @author Mayya Markova
 * @memberof module:data/usersData~usersData
 * @async
 * @param { string|undefined } username Search parameter: a users's username.
 * @param { number|undefined } offset Search parameter: the offset number.
 * @param { number|undefined } limit Search parameter: the number of quizes per page.
 * @returns { Promise<object> } The matching users.
 */
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
