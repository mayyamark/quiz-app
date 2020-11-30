import { useEffect } from 'react';
import { withRouter } from 'react-router';
import ViewQuizHistoryComponent from '../../../components/private/ViewQuiz/ViewQuizHistory';
import { connect , useDispatch } from 'react-redux';
import { getQuizTakenHistory } from '../../../redux-store/actions/Quizzes';
import { Alert } from '@material-ui/lab';

const mapStateToProps = (state) => {
  return {
    quizHistory: state.quizzes.quizTakenHistory,
    error: state.quizzes.error,
  };
};

const ViewQuizHistory = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuizTakenHistory(props.match.params.id));
  }, []);

  return (props.quizHistory ?
    <ViewQuizHistoryComponent quizHistory={props.quizHistory}/>
    :
    (props.error ?
      <Alert severity="warning">{props.error}</Alert>
      :
      <Alert severity="warning">There is no such quiz!</Alert>
    )
  );
};
export default connect(mapStateToProps)(withRouter(ViewQuizHistory));