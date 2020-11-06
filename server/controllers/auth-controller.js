import express from 'express';
import createToken from '../auth/create-token.js';
import bodyValidator from '../middlewares/body-validator.js';
import userRegistrationSchema from '../validators/user-registration.schema.js';
import userLogInSchema from '../validators/user-login.schema.js';
import { USER_ROLES } from '../config.js';
import usersService from '../services/users-service.js';
import serviceErrors from '../services/errors-service.js';
import usersData from '../data/quiz-app-data/users-data.js';

const authController = express.Router();

authController.post('/registration', bodyValidator(userRegistrationSchema), async (req, res) => {
  const registrationData = req.body;
  
  const { user, userError } = await usersService.registerUser(usersData)(registrationData);
  
  if (userError === serviceErrors.DUPLICATE_RESOURCE) {
      return res.status(401).send({ message: 'The username is already taken!' });
  } 
  
  const payload = {
    sub: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role === 'teacher' ? USER_ROLES.TEACHER : USER_ROLES.STUDENT,
  };
  
  const token = createToken(payload);
  
  res.status(200).send({ token });
});

authController.post('/session', bodyValidator(userLogInSchema), async (req, res) => {
  const logInData = req.body;
  
  const { user, userError } = await usersService.getLoggedUser(usersData)(logInData);

  if (userError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: 'User is not found!' });
  }  
  if (userError === serviceErrors.BAD_REQUEST) {
    return res.status(401).send({ message: 'Invalid credentials!' });
  } 
  
  const payload = {
    sub: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role === 'teacher' ? USER_ROLES.TEACHER : USER_ROLES.STUDENT,
  };

  const token = createToken(payload);

  res.status(200).send({ token });
});

export default authController;