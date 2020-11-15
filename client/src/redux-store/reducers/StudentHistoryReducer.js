import {
  SET_STUDENT_HISTORY,
  SET_STUDENT_HISTORY_PAGE,
  FETCH_STUDENT_HISTORY_FAILED,
  START_LOADING_STUDENT_HISTORY,
  STOP_LOADING_STUDENT_HISTORY,
} from '../actions/action-types';

const initialState = {
  studentHistory: {},
  studentHistoryPage: {},
  error: false,
  loading: false,
};

const setStudentHistory = (state, action) => {
  return {
    ...state,
    ... {
      studentHistory: {
        history: action.studentHistory.history,
        currentPage: action.studentHistory.currentPage,
        historyCount: action.studentHistory.historyCount,
        hasNextPage: action.studentHistory.hasNextPage,
        hasPreviousPage: action.studentHistory.hasPreviousPage,
      },
    },
  };
};

const setStudentHistoryPage = (state, action) => {
  return {
    ...state,
    ... {
      studentHistoryPage: {
        history: action.studentHistoryPage.history,
        currentPage: action.studentHistoryPage.currentPage,
        historyCount: action.studentHistoryPage.historyCount,
        hasNextPage: action.studentHistoryPage.hasNextPage,
        hasPreviousPage: action.studentHistoryPage.hasPreviousPage,
      },
    },
  };
};

const fetchStudentHistoryFailed = (state, action) => {
  return { ...state, error: true };
};

const startLoadingStudentHistory = (state, action) => {
  return { ...state, loading: true };
};

const stopLoadingStudentHistory = (state, action) => {
  return { ...state, loading: false };
};

const StudentHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT_HISTORY:
      return setStudentHistory(state, action);
    case SET_STUDENT_HISTORY_PAGE:
      return setStudentHistoryPage(state, action);
    case FETCH_STUDENT_HISTORY_FAILED:
      return fetchStudentHistoryFailed(state, action);
    case START_LOADING_STUDENT_HISTORY:
      return startLoadingStudentHistory(state, action);
    case STOP_LOADING_STUDENT_HISTORY:
      return stopLoadingStudentHistory(state, action);
    default:
      return state;
  }
};

export default StudentHistoryReducer;