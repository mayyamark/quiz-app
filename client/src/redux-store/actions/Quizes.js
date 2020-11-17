import {
  SET_QUIZES,
  FETCH_QUIZES_FAILED,
  START_LOADING_QUIZES,
  STOP_LOADING_QUIZES,
} from './action-types';
import axios from '../../axios-config.js';
import { getToken } from '../../common/manage-token.js';

const setQuizes = (quizes) => {
  return {
    type: SET_QUIZES,
    quizes,
  };
};

const fetchQuizesFailed = () => {
  return {
    type: FETCH_QUIZES_FAILED,
  };
};

const startLoadingQuizes = () => {
  return {
    type: START_LOADING_QUIZES,
  };
};

const stopLoadingQuizes = () => {
  return {
    type: STOP_LOADING_QUIZES,
  };
};

const getQuizes = (page, limit, category) => {
  return dispatch => {
    dispatch(startLoadingQuizes());
    axios.get(`/quizes?page=${page}&limit=${limit}&category=${category}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(res => {
      dispatch(setQuizes(res.data));
    })
    .catch(err => dispatch(fetchQuizesFailed()))
    .finally(() => dispatch(stopLoadingQuizes()));
  };
};

export {
  setQuizes,
  fetchQuizesFailed,
  startLoadingQuizes,
  stopLoadingQuizes,
  getQuizes,
};
