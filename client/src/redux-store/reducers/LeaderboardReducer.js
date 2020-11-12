import * as actionTypes from '../actions/action-types';

const initialState = {
  leaderboard: {},
  error: false,
  loading: false,
};

const setLeaderboard = (state, action) => {
  return {
    ...state,
    ... {
      leaderboard: {
        students: action.leaderboard.students,
        currentPage: action.leaderboard.currentPage,
        studentsCount: action.leaderboard.studentsCount,
        hasNextPage: action.leaderboard.hasNextPage,
        hasPreviousPage: action.leaderboard.hasPreviousPage,
      },
    },
  };
};

const fetchLeaderboardFailed = (state, action) => {
  return { ...state, error: true };
};

const startLoadingLeaderboard = (state, action) => {
  return { ...state, loading: true };
};

const stopLoadingLeaderboard = (state, action) => {
  return { ...state, loading: false };
};

const LeaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LEADERBOARD:
      return setLeaderboard(state, action);
    case actionTypes.FETCH_LEADERBOARD_FAILED:
      return fetchLeaderboardFailed(state, action);
    case actionTypes.START_LOADING_LEADERBOARD:
      return startLoadingLeaderboard(state, action);
    case actionTypes.STOP_LOADING_LEADERBOARD:
      return stopLoadingLeaderboard(state, action);
    default:
      return state;
  }
};

export default LeaderboardReducer;