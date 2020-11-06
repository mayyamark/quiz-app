import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import serviceErrors from '../services/errors-service.js';
import usersService from '../services/users-service.js';
import usersData from '../data/quiz-app-data/users-data.js';

const usersController = express.Router();
usersController.use(authMiddleware, checkTokenMiddleware(usersService));

usersController.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { user, userError } = await usersService.getUserById(usersData)(id);
  
  if (userError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(401).send({ message: 'There is no such user!' });
  } 

  res.status(200).send(user);
});

export default usersController;
