import pool from './pool.js';

const createUser = async (username, password, firstName, lastName, role) => {
  const insertSql = `
    insert into users(username, password, firstName, lastName, roleID, registerDate)
    values (?, ?, ?, ?, (select id from roles where role = ?), ?)
  `;

  const insertData = await pool.query(insertSql, [username, password, firstName, lastName, role, new Date()]);

  return {
    id: insertData.insertId,
    username,
    firstName,
    lastName,
    role,
  };
};

const getByUsername = async (username) => {
  const userSql = `
    select u.id, u.username, u.password, u.firstName, u.lastName, r.role  
    from users u
    join roles r on u.roleID = r.id
    where username = ?;
  `;
  
  const userData = await pool.query(userSql, username);
  return userData[0];
};

export default {
  createUser,
  getByUsername,
};
