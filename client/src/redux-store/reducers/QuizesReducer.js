import {
  SET_QUIZES,
  FETCH_QUIZES_FAILED,
  START_LOADING_QUIZES,
  STOP_LOADING_QUIZES,
} from '../actions/action-types';

const initialState = {
  quizes: {},
  error: false,
  loading: false,
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
    default:
      return state;
  }
};

export default QuizesReducer;