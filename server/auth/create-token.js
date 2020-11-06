import jwt from 'jsonwebtoken';
import { SECRET_KEY, TOKEN_LIFETIME } from './../config.js';

const createToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_LIFETIME });

  return token;
};

export default createToken;
