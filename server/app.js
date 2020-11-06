import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import { PORT } from './config.js';
import authController from './controllers/auth-controller.js';
import quizesController from './controllers/quizes-controller.js';
import usersController from './controllers/users-controller.js';
import studentsController from './controllers/students-controller.js';

const app = express();

passport.use(jwtStrategy);

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(passport.initialize());

app.use('/', authController);
app.use('/quizes', quizesController);
app.use('/students', studentsController);

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () =>
  console.log(`Listening for quiz requests on port ${PORT}!`),
);