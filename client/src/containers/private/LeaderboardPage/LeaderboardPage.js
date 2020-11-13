import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { getLeaderboardPage } from '../../../redux-store/actions/Leaderboard.js';
import LeaderboardPage from '../../../components/private/LeaderboardPage/LeaderboardPage';

const mapStateToProps = state => {
  return {
    leaderboardPage: state.leaderboard.leaderboardPage,
    error: state.leaderboard.error,
    loading: state.leaderboard.loading,
    hasLeaderboardPage: !!state.leaderboard.leaderboardPage.students?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLeaderboardPage: (page, username) => dispatch(getLeaderboardPage(page, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage, axios);