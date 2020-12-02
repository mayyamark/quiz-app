import {
  SET_QUIZZES,
  FETCH_QUIZZES_FAILED,
  START_LOADING_QUIZZES,
  STOP_LOADING_QUIZZES,
  CREATE_QUIZ_COMPLETED,
  CREATE_QUIZ_FAILED,
  CLEAR_LAST_CREATED_QUIZ,
  FETCH_QUIZ_TAKEN_HISTORY_COMPLETED,
  FETCH_QUIZ_TAKEN_HISTORY_FAILED,
} from './action-types';
import axios from '../../axios-config.js';
import { showInfoAlert } from '../../components/common/Alerts/Alerts';

const setQuizzes = (quizzes) => {
  return {
    type: SET_QUIZZES,
    quizzes,
  };
};

const fetchQuizzesFailed = () => {
  return {
    type: FETCH_QUIZZES_FAILED,
  };
};

const startLoadingQuizzes = () => {
  return {
    type: START_LOADING_QUIZZES,
  };
};

const stopLoadingQuizzes = () => {
  return {
    type: STOP_LOADING_QUIZZES,
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

const getQuizzes = (page, limit, category) => {
  return dispatch => {
    dispatch(startLoadingQuizzes());
    axios.get(`/quizzes?page=${page}&limit=${limit}&category=${category}`)
    .then(res => dispatch(setQuizzes(res.data)))
    .catch(err => dispatch(fetchQuizzesFailed()))
    .finally(() => dispatch(stopLoadingQuizzes()));
  };
};

const createQuiz = (quizData) => (dispatch, getState) => {
  axios.post('/quizzes', quizData)
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
  axios.get(`/quizzes/${quizId}/history`)
  .then(response => {
    dispatch(fetchQuizTakenHistoryCompletedAction(response.data));
  })
  .catch(err => {
    dispatch(fetchQuizTakenHistoryFailedAction(err.message));
  });
};

export {
  setQuizzes,
  fetchQuizzesFailed,
  startLoadingQuizzes,
  stopLoadingQuizzes,
  getQuizzes,
  createQuiz,
  clearLastCreatedQuiz,
  getQuizTakenHistory,
};
