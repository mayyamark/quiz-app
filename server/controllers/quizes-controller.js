/** Express router providing quizes related routes.
 * @module routers/quizes
 */
import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import usersService from '../services/users-service.js';
import quizesService from '../services/quizes-service.js';
import quizesData from '../data/quiz-app-data/quizes-data.js';
import questionsData from '../data/quiz-app-data/questions-data.js';
import answersData from '../data/quiz-app-data/answers-data.js';
import serviceErrors from '../services/service-errors.js';
import historyService from '../services/history-service.js';
import historyData from '../data/quiz-app-data/history-data.js';
import roleMiddleware from '../middlewares/role-middleware.js';
import { USER_ROLES } from '../config.js';
import bodyValidator from '../middlewares/body-validator.js';
import quizCreateSchema from '../validators/quiz-create-schema.js';
import quizFinishSchema from '../validators/quiz-finish-schema.js';
import categoriesData from '../data/quiz-app-data/categories-data.js';
import blacklistData from '../data/blacklist-data/blacklist-data.js';

/**
 * Express router to mount quiz related functions on.
 * @type { object }
 * @const
 * @namespace quizesController
 */
const quizesController = express.Router();

quizesController.use(authMiddleware, checkTokenMiddleware(usersService)(blacklistData));

/**
 * Route, which serves searching quizes.
 * @name get/quizes
 * @function
 * @memberof module:routers/quizes~quizesController
 * @inner
 * @param { string } path - Express path.
 * @param { callback } middleware - Express middleware.
 */
quizesController.get('/', async (req, res) => {
  const { page, limit, category, teacher } = req.query;

  if (!page || page < 1) {
    return res.status(400).send({ message: 'Invalid page number!' });
  }

  const quizes = await quizesService.getQuizes(quizesData)(
    +page,
    +limit,
    category,
    teacher,
  );

  res.status(200).send(quizes);
});

quizesController.post('/:id', async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const { quiz, quizError } = await quizesService.getQuizById(quizesData)(id);

  if (quizError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: 'Quiz is not found!' });
  }

  if (user.role === 'student') {
    const { historyError } = await historyService.isQuizSolvedByStudent(
      historyData,
    )(user.id, id);

    if (historyError === serviceErrors.DUPLICATE_RESOURCE) {
      return res.status(400).send({ message: 'Quiz has been already solved!' });
    }
  }

  const startTime = await historyService.startSolvingQuiz(historyData)(
    user.id,
    id,
  );

  res.status(200).send({ quiz, startTime });
});

quizesController.put(
  '/finish',
  bodyValidator(quizFinishSchema),
  async (req, res) => {
    const user = req.user;

    if (user.role === 'student') {
      const { historyError } = await historyService.isQuizSolvedByStudent(
        historyData,
      )(user.id, req.body.id);

      if (historyError === serviceErrors.DUPLICATE_RESOURCE) {
        return res.status(400).send({ message: 'Quiz already solved!' });
      }
    }

    const quizResult = await historyService.finishSolvingQuiz(
      historyData,
      quizesData,
    )(user, req.body);

    if (quizResult.error) {
      if (quizResult.error === serviceErrors.TIMEOUT) {
        return res
          .status(409)
          .send({ message: 'Out of time!', time: quizResult.timeout });
      }
      return res
        .status(500)
        .send({ message: 'There was an error processing your quiz!' });
    }

    return res.status(200).send(quizResult.result);
  },
);

quizesController.post(
  '/',
  roleMiddleware(USER_ROLES.TEACHER),
  bodyValidator(quizCreateSchema),
  async (req, res) => {
    const user = req.user;
    const result = await quizesService.createQuiz(
      quizesData,
      questionsData,
      answersData,
      categoriesData,
    )(user, req.body);

    if (result.error) {
      return res.status(409).send({ error: result.error });
    }

    res.status(200).send(result.quiz);
  },
);

quizesController.get(
  '/:id/history',
  roleMiddleware(USER_ROLES.TEACHER),
  async (req, res) => {
    const { id } = req.params;
    const { page, limit } = req.query;

    if (page && !(Number(page) > 0)) {
      return res.status(400).send({ message: 'Invalid page number!' });
    }
    if (limit && !(Number(limit) > 0)) {
      return res.status(400).send({ message: 'Invalid limit number!' });
    }
    const result = await historyService.getHistoryByQuizId(historyData)(
      id,
      page,
      limit,
    );

    if (result.error) {
      return res.status(404).send([]);
    }

    res.status(200).send(result);
  },
);

export default quizesController;
