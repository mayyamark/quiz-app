import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import roleMiddleware from '../middlewares/role-middleware.js';
import { USER_ROLES } from '../config.js';
import usersService from '../services/users-service.js';
import historyService from '../services/history-service.js';
import historyData from '../data/quiz-app-data/history-data.js';

const studentsController = express.Router();
studentsController.use(authMiddleware, checkTokenMiddleware(usersService), roleMiddleware(USER_ROLES.STUDENT));

studentsController.get('/:id/history', async (req, res) => {
  const { id } = req.params;
  const { page, limit, quiz } = req.query;

  if (req.user.id !== +id) {
    return res.status(403).send({ message: 'Resource is forbidden!' });
  }
  if (!page || page !== page || page < 1) {
   return res.status(400).send({ message: 'Invalid page number!' });
  }

  const history = await historyService.getHistoryByStrudentId(historyData)(id, +page, +limit, quiz);
  
  res.status(200).send(history);
});

export default studentsController;