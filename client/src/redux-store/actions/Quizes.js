import {
  SET_QUIZES,
  FETCH_QUIZES_FAILED,
  START_LOADING_QUIZES,
  STOP_LOADING_QUIZES,
  CREATE_QUIZ_COMPLETED,
  CREATE_QUIZ_FAILED,
  CLEAR_LAST_CREATED_QUIZ,
  FETCH_QUIZ_TAKEN_HISTORY_COMPLETED,
  FETCH_QUIZ_TAKEN_HISTORY_FAILED,
} from './action-types';
import axios from '../../axios-config.js';
import { showInfoAlert } from '../../components/common/Alerts/Alerts';

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

const clearLastCreatedQuizAction = () => {
  return {
    type: CLEAR_LAST_CREATED_QUIZ,
  };
};

const fetchQuizTakenHistoryCompletedAction = (quizHistory) => {
  return {
    type: FETCH_QUIZ_TAKEN_HISTORY_COMPLETED,
    quizHistory: quizHistory,
  };
};

const fetchQuizTakenHistoryFailedAction = (error) => {
  return {
    type: FETCH_QUIZ_TAKEN_HISTORY_FAILED,
    error: error,
  };
};

const getQuizes = (page, limit, category) => {
  return dispatch => {
    dispatch(startLoadingQuizes());
    axios.get(`/quizes?page=${page}&limit=${limit}&category=${category}`)
    .then(res => dispatch(setQuizes(res.data)))
    .catch(err => dispatch(fetchQuizesFailed()))
    .finally(() => dispatch(stopLoadingQuizes()));
  };
};

const createQuiz = (quizData) => (dispatch, getState) => {
  axios.post('/quizes', quizData)
    .then(response => {
      showInfoAlert(
        'Success!',
        `Now there is a quiz '${quizData.name}'!`,
        'success',
        'Nice!',
      );
      dispatch(createQuizCompletedAction(response.data));
    })
    .catch(err => {
      showInfoAlert(
        'Sorry, there was an error!',
        `${err.message}`,
        'error',
        'OK :(',
      );
      dispatch(createQuizFailedAction(err.message));
    });
};

const clearLastCreatedQuiz = () => (dispatch, getState) => {
  dispatch(clearLastCreatedQuizAction());
};

const getQuizTakenHistory = (quizId) => (dispatch, getState) => {
  axios.get(`/quizes/${quizId}/history`)
  .then(response => {
    dispatch(fetchQuizTakenHistoryCompletedAction(response.data));
  })
  .catch(err => {
    dispatch(fetchQuizTakenHistoryFailedAction(err.message));
  });
};

export {
  setQuizes,
  fetchQuizesFailed,
  startLoadingQuizes,
  stopLoadingQuizes,
  getQuizes,
  createQuiz,
  clearLastCreatedQuiz,
  getQuizTakenHistory,
};
