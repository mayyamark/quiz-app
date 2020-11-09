import pool from './pool.js';

const isTokenBlacklisted = async (token) => {
  const blackListSql = `
    SELECT token 
    FROM token_blacklist 
    WHERE token = ?;
  `;

  const blackListData = await pool.query(blackListSql, [token]);

  return blackListData[0] ? true : false;
};

const blacklistToken = async (token) => {
  const insertSql = `
    INSERT INTO token_blacklist 
    (token) VALUES(?); 
  `;
  const blacklistData = await pool.query(insertSql, [token]);

  return blacklistData[0];
};

export default {
  isTokenBlacklisted,
  blacklistToken,
};
