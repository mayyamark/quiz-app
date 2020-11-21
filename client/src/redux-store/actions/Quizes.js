import {
  SET_QUIZES,
  FETCH_QUIZES_FAILED,
  START_LOADING_QUIZES,
  STOP_LOADING_QUIZES,
  CREATE_QUIZ_COMPLETED,
  CREATE_QUIZ_FAILED,
  CLEAR_LAST_CREATED_QUIZ,
} from './action-types';
import axios from '../../axios-config.js';

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
      if (response.status == 201){
        dispatch(createQuizCompletedAction(response.data));
      } else {
        dispatch(createQuizFailedAction(`${response.statusText} ${response.data.error}`));
      }
    })
    .catch(err => {
      dispatch(createQuizFailedAction(err.message));
    });
};

const clearLastCreatedQuiz = () => (dispatch, getState) => {
  dispatch(clearLastCreatedQuizAction());
};

export {
  setQuizes,
  fetchQuizesFailed,
  startLoadingQuizes,
  stopLoadingQuizes,
  getQuizes,
  createQuiz,
  clearLastCreatedQuiz,
};
