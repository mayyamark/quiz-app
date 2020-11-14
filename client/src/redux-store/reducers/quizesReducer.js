import { CREATE_QUIZ_COMPLETED, CREATE_QUIZ_FAILED } from '../actions/action-types';

const initialState = {};

const createQuizState = (action) => {
  return {
    quiz: action.quiz,
  };
};

const failedQuizState = (action) => {
  return {
    error: action.error,
  };
};

const quizesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUIZ_COMPLETED:
      return createQuizState(action);
    case CREATE_QUIZ_FAILED:
      return failedQuizState(action);
    default: return state;
  }
};

export default quizesReducer;