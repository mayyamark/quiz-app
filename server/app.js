import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import { PORT } from './config.js';
import authController from './controllers/auth-controller.js';

const app = express();

passport.use(jwtStrategy);

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(passport.initialize());

app.use('/', authController);

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () =>
  console.log(`Listening for quiz requests on port ${PORT}!`),
);