import {
  SET_STUDENT_HISTORY,
  SET_STUDENT_HISTORY_PAGE,
  SET_SOLVING_INFO,
  // SET_FINISH_SOLVING_INFO,
  FETCH_STUDENT_HISTORY_FAILED,
  START_LOADING_STUDENT_HISTORY,
  STOP_LOADING_STUDENT_HISTORY,
} from './action-types';
import axios from '../../axios-config.js';
import { getToken } from '../../common/manage-token.js';

const setStudentHistory = (studentHistory) => {
  return {
    type: SET_STUDENT_HISTORY,
    studentHistory,
  };
};

const setStudentHistoryPage = (studentHistoryPage) => {
  return {
    type: SET_STUDENT_HISTORY_PAGE,
    studentHistoryPage,
  };
};

const setSolvingInfo = (solvingInfo) => {
  return {
    type: SET_SOLVING_INFO,
    solvingInfo,
  };
};

// const setFinishSolvingInfo = (solvingInfo) => {
//   return {
//     type: SET_FINISH_SOLVING_INFO,
//     solvingInfo,
//   };
// };

const fetchStudentHistoryFailed = () => {
  return {
    type: FETCH_STUDENT_HISTORY_FAILED,
  };
};

const startLoadingStudentHistory = () => {
  return {
    type: START_LOADING_STUDENT_HISTORY,
  };
};

const stopLoadingStudentHistory = () => {
  return {
    type: STOP_LOADING_STUDENT_HISTORY,
  };
};

const initStudentHistory = (userId) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.get(`/students/${userId}/history?page=1`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(res => dispatch(setStudentHistory(res.data)))
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

const getStudentHistoryPage = (userId, page, limit, quiz) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.get(`/students/${userId}/history?page=${page}&limit=${limit}&quiz=${quiz}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(res => dispatch(setStudentHistoryPage(res.data)))
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

const startSolving = (quizId) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.post(`/quizes/${quizId}`, {}, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(res => dispatch(setSolvingInfo(res.data)))
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

const finishSolving = (quizId, solveData) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.put(`/quizes/${quizId}`, solveData, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      // TODO: Add message with score
      alert(`Your result is: ${res.data.score}/${res.data.totalScore}`);
      // dispatch(setFinishSolvingInfo(res.data));
    })
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

export {
  setStudentHistory,
  getStudentHistoryPage,
  setSolvingInfo,
  fetchStudentHistoryFailed,
  startLoadingStudentHistory,
  stopLoadingStudentHistory,
  initStudentHistory,
  startSolving,
  finishSolving,
};
