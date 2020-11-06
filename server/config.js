import dotenv from 'dotenv';

const config = dotenv.config().parsed;

const PORT = config.PORT || 5000;

const DB_QUIZ_CONFIG = {
  host: 'localhost',
  port: '3306',
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: 'quiz',
};

const DB_BLACKLIST_CONFIG = {
  host: 'localhost',
  port: '3306',
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: 'blacklist',
};

const SECRET_KEY = config.SECRET_KEY;

const TOKEN_LIFETIME = 60 * 60; 

const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
};

export {
  PORT,
  DB_QUIZ_CONFIG,
  DB_BLACKLIST_CONFIG,
  SECRET_KEY,
  TOKEN_LIFETIME,
  USER_ROLES,
};

