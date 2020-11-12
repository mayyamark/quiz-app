import {
  SET_STUDENT_HISTORY,
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

export {
  setStudentHistory,
  fetchStudentHistoryFailed,
  startLoadingStudentHistory,
  stopLoadingStudentHistory,
  initStudentHistory,
};
