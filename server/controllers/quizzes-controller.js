/** Express router providing quizzes related routes.
 * @module routers/quizzes
 */
import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import usersService from '../services/users-service.js';
import quizzesService from '../services/quizzes-service.js';
import quizzesData from '../data/quiz-app-data/quizzes-data.js';
import questionsData from '../data/quiz-app-data/questions-data.js';
import answersData from '../data/quiz-app-data/answers-data.js';
import serviceErrors from '../services/service-errors.js';
import historyService from '../services/history-service.js';
import historyData from '../data/quiz-app-data/history-data.js';
import roleMiddleware from '../middlewares/role-middleware.js';
import { USER_ROLES } from '../constants.js';
import bodyValidator from '../middlewares/body-validator.js';
import quizCreateSchema from '../validators/quiz-create-schema.js';
import quizFinishSchema from '../validators/quiz-finish-schema.js';
import categoriesData from '../data/quiz-app-data/categories-data.js';
import blacklistData from '../data/blacklist-data/blacklist-data.js';

/**
 * Express router to mount quiz related functions on.
 * @type { object }
 * @const
 * @namespace quizzesController
 */
const quizzesController = express.Router();

quizzesController.use(authMiddleware, checkTokenMiddleware(usersService)(blacklistData));

/**
 * Route, which serves searching quizzes.
 * @name get/quizzes
 * @function
 * @memberof module:routers/quizzes~quizzesController
 * @inner
 * @param { string } path - Express path.
 * @param { callback } middleware - Express middleware.
 */
quizzesController.get('/', async (req, res) => {
  const { page, limit, category, teacher } = req.query;
  const user = req.user;

  if (!page || page < 1) {
    return res.status(400).send({ message: 'Invalid page number!' });
  }

  const quizzes = await quizzesService.getQuizzes(quizzesData)(
    +page,
    +limit,
    category,
    teacher,
    user,
  );

  res.status(200).send(quizzes);
});

/**
 * Route, which serves start solving a quiz.
 * @name post/quizzes/:id
 * @function
 * @memberof module:routers/quizzes~quizzesController
 * @inner
 * @param { string } path - Express path.
 * @param { callback } middleware - Express middleware.
 */
quizzesController.post('/:id', async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { quiz, quizError } = await quizzesService.getQuizById(quizzesData)(id);

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

  const { startError, startTime } = await historyService.startSolvingQuiz(historyData)(
    user,
    id,
  );
  if (startError === serviceErrors.BAD_REQUEST) {
    return res.status(400).send({ message: 'Can\'t solve 2 quizzes at the same time!' });
  }

  res.status(200).send({ quiz, startTime });
});

quizzesController.put('/:id', bodyValidator(quizFinishSchema),
  async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const solvedQuizData = { ...req.body, id };

    if (user.role === 'student') {
      const { history } = await historyService.isQuizSolvedByStudent(historyData)(user.id, id);

      if (!history) {
        return res.status(400).send({ message: 'Quiz is not started!' });
      }
    }

    const quizResult = await historyService.finishSolvingQuiz(
      historyData,
      quizzesData,
    )(user, solvedQuizData);

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

quizzesController.post('/',
  roleMiddleware(USER_ROLES.TEACHER),
  bodyValidator(quizCreateSchema),
  async (req, res) => {
    const user = req.user;
    const result = await quizzesService.createQuiz(
      quizzesData,
      questionsData,
      answersData,
      categoriesData,
    )(user, req.body);

    if (result.error) {
      return res.status(409).send({ error: result.error });
    }

    res.status(201).send(result.quiz);
  },
);

quizzesController.get('/:id/history', roleMiddleware(USER_ROLES.TEACHER),
  async (req, res) => {
    const { id } = req.params;
    const { page, limit } = req.query;

    if (page && !(Number(page) > 0)) {
      return res.status(400).send({ message: 'Invalid page number!' });
    }
    if (limit && !(Number(limit) > 0)) {
      return res.status(400).send({ message: 'Invalid limit number!' });
    }
    const result = await historyService.getHistoryByQuizId(historyData)(id, page, limit);

    if (result.error){
      return res.status(404).send([]);
    }
    res.status(200).send(result);
  });

quizzesController.get('/:id', roleMiddleware(USER_ROLES.TEACHER), async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { quiz, quizError } = await quizzesService.getQuizById(quizzesData)(id);

  if (quizError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: 'Quiz is not found!' });
  }

  res.status(200).send({ quiz });
});

export default quizzesController;
