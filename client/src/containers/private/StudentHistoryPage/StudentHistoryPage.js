import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { getStudentHistoryPage } from '../../../redux-store/actions/StudentHistory.js';
import StudentHistoryPage from '../../../components/private/StudentHistoryPage/StudentHistoryPage.js';

const mapStateToProps = state => {
  return {
    studentHistoryPage: state.studentHistory.studentHistoryPage,
    error: state.studentHistory.error,
    loading: state.studentHistory.loading,
    hasStudentHistoryPage: !!state.studentHistory.studentHistoryPage.history?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetStudentHistoryPage: (userId, page, quiz) => dispatch(getStudentHistoryPage(userId, page, quiz)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentHistoryPage, axios);