import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { initLeaderboard } from '../../../redux-store/actions/Leaderboard.js';
import Leaderboard from '../../../components/private/Leaderboard/Leaderboard';

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.leaderboard,
    error: state.leaderboard.error,
    loading: state.leaderboard.loading,
    hasLeaderboard: !!state.leaderboard.leaderboard.students?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLeaderboard: () => dispatch(initLeaderboard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard, axios);