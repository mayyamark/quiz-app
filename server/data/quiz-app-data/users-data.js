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

const searchBy = async (username) => {
  let usersSql = `
    select u.id, u.avatar, u.username, u.firstName, u.lastName, (select sum(score) from history h where h.userID = u.id) as totalScore
    from users u
    where u.roleID = 2
  `;

  if (username) {
    usersSql += ` and u.username like '%${username}%'`;
  }

  usersSql += ' order by totalScore desc';

  return await pool.query(usersSql);
};

const searchByWithPages = async (username, offset, limit) => {
  let usersSql = `
    select u.id, u.avatar, u.username, u.firstName, u.lastName, (select sum(score) from history h where h.userID = u.id) as totalScore
    from users u
    where u.roleID = 2
  `;

  if (username) {
    usersSql += ` and u.username like '%${username}%'`;
  }

  usersSql += ' order by totalScore desc';
  
  if (offset !== undefined && limit) {
    usersSql += ` limit ${limit} offset ${offset}`;
  }

  return await pool.query(usersSql);
};

export default {
  createUser,
  getByUsername,
  searchBy,
  searchByWithPages,
};
