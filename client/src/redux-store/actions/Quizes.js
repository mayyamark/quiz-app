import {
  SET_QUIZES,
  FETCH_QUIZES_FAILED,
  START_LOADING_QUIZES,
  STOP_LOADING_QUIZES,
  CREATE_QUIZ_COMPLETED,
  CREATE_QUIZ_FAILED,
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

const createQuizCompletedAction = (quiz) => {
  return {
    type: CREATE_QUIZ_COMPLETED,
    quiz: quiz,
  };
};

const createQuizFailedAction = (error) => {
  return {
    type: CREATE_QUIZ_FAILED,
    error: error,
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

const createQuiz = (quizData) => async (dispatch, getState) => {
  try {
    const response = await axios.post('/quizes', quizData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status == 201){
      dispatch(createQuizCompletedAction(response.data));
    } else {
      dispatch(createQuizFailedAction(`${response.statusText} ${response.data.error}`));
    }
  }
  catch (err) {
    dispatch(createQuizFailedAction(err.message));
  }
};

export {
  setQuizes,
  fetchQuizesFailed,
  startLoadingQuizes,
  stopLoadingQuizes,
  getQuizes,
  createQuiz,
};
