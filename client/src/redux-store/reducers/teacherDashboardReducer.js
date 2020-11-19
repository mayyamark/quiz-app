import {
  TEACHER_DASH_GET_QUIZZES_LOADING,
  TEACHER_DASH_GET_QUIZZES_COMPLETED,
  TEACHER_DASH_GET_QUIZZES_FAILED,
  TEACHER_DASH_CREATE_CATEGORY_FAILED,
} from '../actions/action-types';

const initialState = {
  quizzes: null,
  error: null,
};

const setQuizzesLoadingToState = (state, action) => {
  return {
    quizzes: state.quizzes,
    loading: action.payload,
  };
};

const setQuizzesToState = (state, action) => {
  return {
    quizzes: action.payload,
    loading: state.loading,
  };
};

const failedState = (state, action) => {
  return {
    quizzes: state.quizzes,
    error: action.payload,
  };
};

const teacherDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHER_DASH_GET_QUIZZES_LOADING:
      return setQuizzesLoadingToState(state, action);
    case TEACHER_DASH_GET_QUIZZES_COMPLETED:
      return setQuizzesToState(state, action);
    case TEACHER_DASH_GET_QUIZZES_FAILED:
    case TEACHER_DASH_CREATE_CATEGORY_FAILED:
      return failedState(state, action);
    default: return state;
  }
};

export default teacherDashboardReducer;