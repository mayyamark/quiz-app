import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { startSolving, finishSolving } from '../../../redux-store/actions/StudentHistory';
import SolvePage from '../../../components/private/SolvePage/SolvePage';

const mapStateToProps = state => {
  return {
    solvingInfo: state.studentHistory.solvingInfo,
    error: state.studentHistory.error,
    loading: state.studentHistory.loading,
    hasQuiz: !!state.studentHistory.solvingInfo.startTime?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartSolving: (quizId) => dispatch(startSolving(quizId)),
    onFinishSolving: (quizId, solveData) => dispatch(finishSolving(quizId, solveData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SolvePage, axios);