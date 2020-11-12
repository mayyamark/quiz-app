import {
  SET_LEADERBOARD,
  SET_LEADERBOARD_PAGE,
  FETCH_LEADERBOARD_FAILED,
  START_LOADING_LEADERBOARD,
  STOP_LOADING_LEADERBOARD,
} from './action-types';
import axios from '../../axios-config.js';
import { getToken } from '../../common/manage-token.js';

const setLeaderboard = (leaderboard) => {
  return {
    type: SET_LEADERBOARD,
    leaderboard,
  };
};

const setLeaderboardPage = (leaderboardPage) => {
  return {
    type: SET_LEADERBOARD_PAGE,
    leaderboardPage,
  };
};

const fetchLeaderboardFailed = () => {
  return {
    type: FETCH_LEADERBOARD_FAILED,
  };
};

const startLoadingLeaderboard = () => {
  return {
    type: START_LOADING_LEADERBOARD,
  };
};

const stopLoadingLeaderboard = () => {
  return {
    type: STOP_LOADING_LEADERBOARD,
  };
};

const initLeaderboard = () => {
  return dispatch => {
    dispatch(startLoadingLeaderboard());
    axios.get('/students?page=1', {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(res => {
      dispatch(setLeaderboard(res.data));
    })
    .catch(err => dispatch(fetchLeaderboardFailed()))
    .finally(() => dispatch(stopLoadingLeaderboard()));
  };
};

const getLeaderboardPage = (page) => {
  console.log('fetch');
  return dispatch => {
    dispatch(startLoadingLeaderboard());
    axios.get(`/students?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(res => dispatch(setLeaderboardPage(res.data)))
    .catch(err => dispatch(fetchLeaderboardFailed()))
    .finally(() => dispatch(stopLoadingLeaderboard()));
  };
};

export {
  setLeaderboard,
  setLeaderboardPage,
  fetchLeaderboardFailed,
  startLoadingLeaderboard,
  stopLoadingLeaderboard,
  initLeaderboard,
  getLeaderboardPage,
};
