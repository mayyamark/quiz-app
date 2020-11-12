import {
  SET_LEADERBOARD,
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

export {
  setLeaderboard,
  fetchLeaderboardFailed,
  startLoadingLeaderboard,
  stopLoadingLeaderboard,
  initLeaderboard,
};
