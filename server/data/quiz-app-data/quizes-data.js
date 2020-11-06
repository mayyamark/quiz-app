import pool from './pool.js';

const searchBy = async (category, teacher) => {
  let quizesSql = `
    select q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    from quizes q
    join users u on q.teacherID = u.id
    join categories c on q.categoryID = c.id
  `;

  if (category) {
    quizesSql += ` and c.category like '%${category}%'`;
  }
  if (teacher) {
    quizesSql += ` 
      and u.username like  '%${teacher}%'
      order by q.id desc
    `;
  } else {
    quizesSql += ' order by q.name asc';
  }

  return await pool.query(quizesSql);
};  

const searchByWithPages = async (category, teacher, offset, limit) => {
  let quizesSql = `
    select q.id, q.name, c.category, q.time, u.username, u.firstName, u.lastName
    from quizes q
    join users u on q.teacherID = u.id
    join categories c on q.categoryID = c.id
  `;

  if (category) {
    quizesSql += ` and c.category like '%${category}%'`;
  }
  if (teacher) {
    quizesSql += ` 
      and u.username like  '%${teacher}%'
      order by q.id desc
    `;
  } else {
    quizesSql += ' order by q.name asc';
  }

  if (offset !== undefined && limit) {
    quizesSql += ` limit ${limit} offset ${offset}`;
  }
  
  return await pool.query(quizesSql);
};

export default {
  searchBy,
  searchByWithPages,
};
