import pool from './pool.js';

const createUser = async (username, password, firstName, lastName) => {
  const insertSql = `
    insert into users(username, password, firstName, lastName, roleID, registerDate)
    values (?, ?, ?, ?, 2, ?)
  `;

  const insertData = await pool.query(insertSql, [username, password, firstName, lastName, new Date()]);

  return {
    id: insertData.insertId,
    username,
    firstName,
    lastName,
  };
};

const getByUsername = async (username) => {
  const userSql = `
    select u.id, u.username, u.password, u.firstName, u.lastName, r.role  
    from users u
    join roles r on u.roleID = r.id
    where username = ?
  `;
  
  const userData = await pool.query(userSql, [username]);
  return userData[0];
};

export default {
  createUser,
  getByUsername,
};
