import mariadb from 'mariadb';
import { DB_BLACKLIST_CONFIG } from '../../config.js';

const pool = mariadb.createPool(DB_BLACKLIST_CONFIG);

export default pool;