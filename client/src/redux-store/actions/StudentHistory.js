import {
  SET_STUDENT_HISTORY,
  SET_STUDENT_HISTORY_PAGE,
  SET_SOLVING_INFO,
  FETCH_STUDENT_HISTORY_FAILED,
  START_LOADING_STUDENT_HISTORY,
  STOP_LOADING_STUDENT_HISTORY,
} from './action-types';
import axios from '../../axios-config.js';
import { showConfirmAlert } from '../../components/common/Alerts/Alerts';

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
    axios.get(`/students/${userId}/history?page=1`)
    .then(res => dispatch(setStudentHistory(res.data)))
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

const getStudentHistoryPage = (userId, page, limit, quiz) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.get(`/students/${userId}/history?page=${page}&limit=${limit}&quiz=${quiz}`)
    .then(res => dispatch(setStudentHistoryPage(res.data)))
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

const startSolving = (quizId) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.post(`/quizes/${quizId}`)
    .then(res => dispatch(setSolvingInfo(res.data)))
    .catch(err => dispatch(fetchStudentHistoryFailed()))
    .finally(() => dispatch(stopLoadingStudentHistory()));
  };
};

const finishSolving = (quizId, solveData, historyObj) => {
  return dispatch => {
    dispatch(startLoadingStudentHistory());
    axios.put(`/quizes/${quizId}`, solveData)
    .then(res => {
      showConfirmAlert(`Result: ${res.data.score}/${res.data.totalScore}`, 'Try another one!', 'success', false, historyObj, '/dashboard');
      dispatch(setSolvingInfo({}));
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
