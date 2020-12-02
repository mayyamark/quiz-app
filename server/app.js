import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import { PORT } from './config.js';
import authController from './controllers/auth-controller.js';
import quizzesController from './controllers/quizzes-controller.js';
import studentsController from './controllers/students-controller.js';
import categoriesController from './controllers/categories-controller.js';

const app = express();

passport.use(jwtStrategy);

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(passport.initialize());

app.use('/auth', authController);
app.use('/quizzes', quizzesController);
app.use('/students', studentsController);
app.use('/categories', categoriesController);

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);

app.use((err, req, res, next) =>
  res.status(500).send({ message: 'An unexpected error occurred!' }),
);

app.listen(PORT, () =>
  console.log(`Listening for quiz requests on port ${PORT}!`),
);