import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import usersService from '../services/users-service.js';
import quizesService from '../services/quizes-service.js';
import quizesData from '../data/quiz-app-data/quizes-data.js';
import serviceErrors from '../services/errors-service.js';
import historyService from '../services/history-service.js';
import historyData from '../data/quiz-app-data/history-data.js';

const quizesController = express.Router();
quizesController.use(authMiddleware, checkTokenMiddleware(usersService));

quizesController.get('/', async (req, res) => {
  const { page, limit, category, teacher } = req.query;

  if (!page || page !== page || page < 1) {
    return res.status(400).send({ message: 'Invalid page number!' });
  }

  const quizes = await quizesService.getQuizes(quizesData)(+page, +limit, category, teacher);

  res.status(200).send(quizes);
});

quizesController.post('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const { quiz, quizError } = await quizesService.getQuizById(quizesData)(id);
  
  if (quizError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: 'Quiz is not found!' });
  }

  if (user.role === 'student') {
    const { historyError } = await historyService.isQuizSolvedByStudent(historyData)(user.id, id);

    if (historyError === serviceErrors.DUPLICATE_RESOURCE) {
      return res.status(400).send({ message: 'Quiz has been already solved!' });
    }
  }

  const startTime = await historyService.startSolvingQuiz(historyData)(user.id, id);

  res.status(200).send({ quiz, startTime });
});

export default quizesController;
