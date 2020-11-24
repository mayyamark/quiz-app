import axios from 'axios';
import { getToken } from './common/manage-token';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

instance.interceptors.request.use(req => {
  req.headers.authorization = `Bearer ${getToken()}`;
  req.headers['content-type'] = 'application/json';
  return req;
});

instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.data) {
      throw new Error(`${err.response.data.error}`);
    }
    throw err;
  },
);

export default instance;