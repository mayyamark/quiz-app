import {
  SET_QUIZZES,
  FETCH_QUIZZES_FAILED,
  START_LOADING_QUIZZES,
  STOP_LOADING_QUIZZES,
  CREATE_QUIZ_FAILED,
  CREATE_QUIZ_COMPLETED,
  CLEAR_LAST_CREATED_QUIZ,
  FETCH_QUIZ_TAKEN_HISTORY_COMPLETED,
  FETCH_QUIZ_TAKEN_HISTORY_FAILED,
} from '../actions/action-types';

const initialState = {
  quizzes: {},
  error: false,
  loading: false,
  lastCreatedQuiz: null,
  quizTakenHistory: null,
};

const setQuizzes = (state, action) => {
  return {
    ...state,
    ... {
      quizzes: {
        quizzes: action.quizzes.quizzes,
        currentPage: action.quizzes.currentPage,
        quizzesCount: action.quizzes.quizzesCount,
        hasNextPage: action.quizzes.hasNextPage,
        hasPreviousPage: action.quizzes.hasPreviousPage,
      },
    },
  };
};

const fetchQuizzesFailed = (state, action) => {
  return { ...state, error: true };
};

const startLoadingQuizzes = (state, action) => {
  return { ...state, loading: true };
};

const stopLoadingQuizzes = (state, action) => {
  return { ...state, loading: false };
};

const lastCreatedQuizToState = (state, action) => {
  return {
    ...state,
    lastCreatedQuiz: action.quiz,
  };
};

const createQuizFailedQuizState = (state, action) => {
  return {
    ...state,
    lastCreatedQuiz: null,
    error: action.error,
  };
};

const clearLastCreatedQuizState = (state) => {
  return {
    ...state,
    lastCreatedQuiz: null,
  };
};

const fetchQuizTakenHistoryCompleted = (state, action) => {
    return {
    ...state,
    quizTakenHistory: action.quizHistory,
  };
};

const fetchQuizTakenHistoryFailed = (state, action) => {
    return {
    ...state,
    quizTakenHistory: null,
    error: action.error,
  };
};

const QuizzesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZZES:
      return setQuizzes(state, action);
    case FETCH_QUIZZES_FAILED:
      return fetchQuizzesFailed(state, action);
    case START_LOADING_QUIZZES:
      return startLoadingQuizzes(state, action);
    case STOP_LOADING_QUIZZES:
      return stopLoadingQuizzes(state, action);
    case CREATE_QUIZ_COMPLETED:
      return lastCreatedQuizToState(state, action);
    case CREATE_QUIZ_FAILED:
      return createQuizFailedQuizState(state, action);
    case CLEAR_LAST_CREATED_QUIZ:
      return clearLastCreatedQuizState(state);
    case FETCH_QUIZ_TAKEN_HISTORY_COMPLETED:
      return fetchQuizTakenHistoryCompleted(state, action);
    case FETCH_QUIZ_TAKEN_HISTORY_FAILED:
      return fetchQuizTakenHistoryFailed(state, action);
    default:
      return state;
  }
};

export default QuizzesReducer;