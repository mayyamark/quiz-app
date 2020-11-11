/** Express router providing quizes related routes.
 * @module middlewares/bodyValidator
 */
import { schemaValidator } from '../validators/schema-validator.js';
/**
 * Middleware for validating request body.
 * @type { object }
 * @const
 * @namespace bodyValidator
 * @memberof module:middlewares/bodyValidator
 */

/**
 * Returns a function, which gets a student's quiz history.
 * @author Mayya Markova
 * @param { object } schema A scema with validations.
 * @return { function } A function, which validates the request body.
 */
const bodyValidator = (schema) => {
  /**
   * Validates the request body.
   * @author Mayya Markova
   * @async
   * @function bodyValidatorInnerFunction
   * @param { object } req Express request object
   * @param { object } res Express response object
   * @param { functions } next Express next middleware function
   * @returns { void|object }
   */
  return (req, res, next) => {
    const body = req.body;
    const fails = schemaValidator(schema, body);

    if (fails) {
      res.status(400).send(fails);
    } else {
      next();
    }
  };
};

export default bodyValidator;
