import {
  CREATE_QUIZ_GET_CATEGORIES_COMPLETED,
  CREATE_QUIZ_GET_CATEGORIES_FAILED,
} from '../actions/action-types';

const initialState = {
  quiz: null,
  categories: [],
  error: null,
};

const addCategoriesState = (state, action) => {
  return {
    quiz: state.quiz,
    categories: action.categories,
  };
};

const failedQuizState = (action) => {
  return {
    error: action.error,
  };
};

const createQuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUIZ_GET_CATEGORIES_COMPLETED:
      return addCategoriesState(state, action);
    case CREATE_QUIZ_GET_CATEGORIES_FAILED:
      return failedQuizState(action);
    default: return state;
  }
};

export default createQuizReducer;