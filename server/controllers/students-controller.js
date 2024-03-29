/** Express router providing students related routes.
 * @module routers/students
 */

import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import roleMiddleware from '../middlewares/role-middleware.js';
import { USER_ROLES } from '../constants.js';
import usersService from '../services/users-service.js';
import historyService from '../services/history-service.js';
import historyData from '../data/quiz-app-data/history-data.js';
import usersData from '../data/quiz-app-data/users-data.js';
import blacklistData from '../data/blacklist-data/blacklist-data.js';

/**
 * Express router to mount student related functions on.
 * @type { object }
 * @const
 * @namespace studentsController
 */
const studentsController = express.Router();

studentsController.use(
  authMiddleware,
  checkTokenMiddleware(usersService)(blacklistData),
  roleMiddleware(USER_ROLES.STUDENT),
);

/**
 * Route, which serves searching student's history.
 * @name get/students
 * @function
 * @memberof module:routers/students~studentsController
 * @inner
 * @param { string } path - Express path.
 * @param { callback } middleware - Express middleware.
 */
studentsController.get('/', async (req, res) => {
  const { page, limit, username } = req.query;

  if (!page || page < 1) {
    return res.status(400).send({ message: 'Invalid page number!' });
  }

  const leaderboard = await usersService.getTopStudents(usersData)(
    +page,
    +limit,
    username,
  );

  res.status(200).send(leaderboard);
});

/**
 * Route, which serves searching student's history.
 * @name get/students/:id/history
 * @function
 * @memberof module:routers/students~studentsController
 * @inner
 * @param { string } path - Express path.
 * @param { callback } middleware - Express middleware.
 */
studentsController.get('/:id/history', async (req, res) => {
  const { id } = req.params;
  const { page, limit, quiz } = req.query;

  if (req.user.id !== +id) {
    return res.status(403).send({ message: 'Resource is forbidden!' });
  }
  if (!page || page < 1) {
    return res.status(400).send({ message: 'Invalid page number!' });
  }

  const history = await historyService.getHistoryByStrudentId(historyData)(
    id,
    +page,
    +limit,
    quiz,
  );

  res.status(200).send(history);
});

export default studentsController;
