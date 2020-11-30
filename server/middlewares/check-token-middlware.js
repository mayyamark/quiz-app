/** Express router providing quizzes related routes.
 * @module middlewares/checkTokenMiddleware
 */
import serviceErrors from '../services/service-errors.js';

/**
 * Middleware for validating request body.
 * @type { object }
 * @const
 * @namespace checkTokenMiddleware
 * @memberof module:middlewares/checkTokenMiddleware
 */

/**
 * A middleware, which checks if the current user's token is valid.
 * @author Mayya Markova
 * @param { object } usersService An object with users' service-layer functions.
 * @returns { function } A function, which accepts an object with data-layer functions.
 */
const checkTokenMiddleware = (usersService) => {
  /**
   * @author Mayya Markova
   * @async
   * @function checkTokenMiddlewareInnerFunction
   * @param { object } blacklistData An object with data-layer functions.
   * @returns { function } A function, which checks if the user is logged out.
   */
  return (blacklistData) => {
    /**
     * @author Mayya Markova
     * @async
     * @function checkTokenMiddlewareInnermostFunction
     * @param { object } req Express request object
     * @param { object } res Express response object
     * @param { functions } next Express next middleware function
     * @returns { void|object }
     */
    return async (req, res, next) => {
      const token =  req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(404).json({ message: 'No token in the request!' });
      }

      const { tokenError } = await usersService.isUserLoggedOut(blacklistData)(token);
      if (tokenError === serviceErrors.UNAUTHORIZED) {
        return res.status(403).json({ message: 'User is not logged in!' });
      }

      next();
    };
  };
};

export default checkTokenMiddleware;
