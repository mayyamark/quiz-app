import mariadb from 'mariadb';
import { DB_QUIZ_CONFIG } from '../../config.js';

const pool = mariadb.createPool(DB_QUIZ_CONFIG);

export default pool;