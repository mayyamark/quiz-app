import {
  SET_QUIZES,
  FETCH_QUIZES_FAILED,
  START_LOADING_QUIZES,
  STOP_LOADING_QUIZES,
  CREATE_QUIZ_FAILED,
  CREATE_QUIZ_COMPLETED,
} from '../actions/action-types';

const initialState = {
  quizes: {},
  error: false,
  loading: false,
  lastCreatedQuiz: null,
};

const setQuizes = (state, action) => {
  return {
    ...state,
    ... {
      quizes: {
        quizes: action.quizes.quizes,
        currentPage: action.quizes.currentPage,
        quizesCount: action.quizes.quizesCount,
        hasNextPage: action.quizes.hasNextPage,
        hasPreviousPage: action.quizes.hasPreviousPage,
      },
    },
  };
};

const fetchQuizesFailed = (state, action) => {
  return { ...state, error: true };
};

const startLoadingQuizes = (state, action) => {
  return { ...state, loading: true };
};

const stopLoadingQuizes = (state, action) => {
  return { ...state, loading: false };
};

const addQuizToState = (state, action) => {
  return {
    ...state,
    lastCreatedQuiz: action.quiz,
  };
};

const failedQuizState = (state, action) => {
  return {
    ...state,
    lastCreatedQuiz: null,
    error: action.error,
  };
};

const QuizesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZES:
      return setQuizes(state, action);
    case FETCH_QUIZES_FAILED:
      return fetchQuizesFailed(state, action);
    case START_LOADING_QUIZES:
      return startLoadingQuizes(state, action);
    case STOP_LOADING_QUIZES:
      return stopLoadingQuizes(state, action);
    case CREATE_QUIZ_COMPLETED:
      return addQuizToState(state, action);
    case CREATE_QUIZ_FAILED:
      return failedQuizState(state, action);
    default:
      return state;
  }
};

export default QuizesReducer;