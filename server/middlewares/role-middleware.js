/** Express router providing quizes related routes.
 * @module middlewares/roleMiddleware
 */

/**
 * Middleware for checking the current user's role.
 * @type { object }
 * @const
 * @namespace roleMiddleware
 * @memberof module:middlewares/roleMiddleware
 */

/**
 * A middleware, which checks if the current user is authorized.
 * @author Mayya Markova
 * @param { string } roleName The role's name that is authorized.
 * @returns { function } A function, which checks the current user's role.
 */
const roleMiddleware = (roleName) => {
  /**
   * @author Mayya Markova
   * @async
   * @function roleMiddlewareInnerFunction
   * @param { object } req Express request object
   * @param { object } res Express response object
   * @param { functions } next Express next middleware function
   * @returns { void|object }
   */
  return (req, res, next) => {
    if (!req.user || req.user.role !== roleName) {
      return res.status(403).send({ message: 'Resource is forbidden!' });
    }

    next();
  };
};

export default roleMiddleware;
