/** Config options.
 * @module config
 */
import dotenv from 'dotenv';

/**
 * Object with config options.
 * @type { object }
 * @const
 * @namespace configOptions
 */

/**
 * Object, containing options from .env file.
 * @const
 * @type { object }
 * @memberof module:config~configOptions
 */
const config = dotenv.config().parsed || process.env;

/**
 * Server listening port.
 * @const
 * @type { number }
 * @memberof module:config~configOptions
 */
const PORT = config.SERVER_PORT || 5000;

/**
 * Object, containing options for the database configuration.
 * @const
 * @type { object }
 * @memberof module:config~configOptions
 */
const DB_QUIZ_CONFIG = {
  host: config.DB_HOST,
  port: '3306',
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: 'quiz',
};

/**
 * Object, containing for the database configuration.
 * @const
 * @type { object }
 * @memberof module:config~configOptions
 */
const DB_BLACKLIST_CONFIG = {
  host: config.DB_HOST,
  port: '3306',
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: 'blacklist',
};

/**
 * Server's secret key for creating tokens.
 * @const
 * @type { string }
 * @memberof module:config~configOptions
 */
const SECRET_KEY = config.SECRET_KEY;

/**
 * The lifetime of the token.
 * @const
 * @type { number }
 * @memberof module:config~configOptions
 */
const TOKEN_LIFETIME = 60 * 60;

export {
  PORT,
  DB_QUIZ_CONFIG,
  DB_BLACKLIST_CONFIG,
  SECRET_KEY,
  TOKEN_LIFETIME,
};
