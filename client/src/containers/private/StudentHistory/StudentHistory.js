import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { initStudentHistory } from '../../../redux-store/actions/StudentHistory.js';
import StudentHistory from '../../../components/private/StudentHistory/StudentHistory';

const mapStateToProps = state => {
  return {
    studentHistory: state.studentHistory.studentHistory,
    error: state.studentHistory.error,
    loading: state.studentHistory.loading,
    hasStudentHistory: !!state.studentHistory.studentHistory.history?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitStudentHistory: (userId) => dispatch(initStudentHistory(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentHistory, axios);