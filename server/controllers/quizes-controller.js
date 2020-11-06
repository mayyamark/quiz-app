import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import usersService from '../services/users-service.js';
import quizesService from '../services/quizes-service.js';
import quizesData from '../data/quiz-app-data/quizes-data.js';

const quizesController = express.Router();
quizesController.use(authMiddleware, checkTokenMiddleware(usersService));

quizesController.get('/', async (req, res) => {
  const { page, category, teacher } = req.query;

  if (!page || page !== page || page < 1) {
    return res.status(400).send({ message: 'Invalid page number!' });
  }

  const quizes = await quizesService.getQuizes(quizesData)(+page, category, teacher);

  res.status(200).send(quizes);
});

export default quizesController;
