import pool from './pool.js';

const isTokenBlacklisted = async (token) => {
  const blackListSql = `
    select token from token_blacklist 
    where token = ?;
  `;

  const blackListData = await pool.query(blackListSql, [token]);

  return blackListData[0] ? true : false;
};

const blacklistToken = async (token) => {
  const insertSql = `
    insert into token_blacklist 
    (token) values(?); 
  `;
  const blacklistData = await pool.query(insertSql, [token]);

  return blacklistData[0];
};

export default {
  isTokenBlacklisted,
  blacklistToken,
};
