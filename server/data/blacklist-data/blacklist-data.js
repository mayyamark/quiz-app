import pool from './pool.js';

/**
 * Checks if the user's token is blacklisted.
 * @author Mayya Markova
 * @async
 * @param { string } token The token to check.
 * @returns { Promise<object> } True if it is blacklisted or false if it is not.
 */
const isTokenBlacklisted = async (token) => {
  const blackListSql = `
    SELECT token
    FROM token_blacklist
    WHERE token = ?;
  `;

  const blackListData = await pool.query(blackListSql, [token]);

  return blackListData[0] ? true : false;
};

/**
 * Invalidates the user's token.
 * @author Mayya Markova
 * @async
 * @param { string } token The token to invalidate.
 * @returns { Promise<object> } Insert information.
 */
const blacklistToken = async (token) => {
  const insertSql = `
    INSERT INTO token_blacklist
    (token) VALUES(?);
  `;

  return await pool.query(insertSql, [token]);
};

export default {
  isTokenBlacklisted,
  blacklistToken,
};
