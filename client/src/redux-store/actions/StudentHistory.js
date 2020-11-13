import {
  SET_STUDENT_HISTORY,
  SET_STUDENT_HISTORY_PAGE,
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

const getStudentHistoryPage = (userId, page, quiz) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.get(`/students/${userId}/history?page=${page}&quiz=${quiz}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(res => dispatch(setStudentHistoryPage(res.data)))
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

export {
  setStudentHistory,
  getStudentHistoryPage,
  fetchStudentHistoryFailed,
  startLoadingStudentHistory,
  stopLoadingStudentHistory,
  initStudentHistory,
};
