import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { getQuizzes } from '../../../redux-store/actions/Quizzes';
import { setSolvingInfo } from '../../../redux-store/actions/StudentHistory';
import Quizzes from '../../../components/private/Quizzes/Quizzes';

const mapStateToProps = state => {
  return {
    quizzes: state.quizzes.quizzes,
    error: state.quizzes.error,
    loading: state.quizzes.loading,
    hasQuizzes: !!state.quizzes.quizzes.quizzes?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetQuizzes: (page, limit, category) => dispatch(getQuizzes(page, limit, category)),
    onSetSolvingInfo: () => dispatch(setSolvingInfo({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes, axios);