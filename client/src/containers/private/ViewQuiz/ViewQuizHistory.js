import { useEffect } from 'react';
import { withRouter } from 'react-router';
import ViewQuizHistoryComponent from '../../../components/private/ViewQuiz/ViewQuizHistory';
import { connect , useDispatch } from 'react-redux';
import { getQuizTakenHistory } from '../../../redux-store/actions/Quizes';
import { Alert } from '@material-ui/lab';

const mapStateToProps = (state) => {
  return {
    quizHistory: state.quizes.quizTakenHistory,
    error: state.quizes.error,
  };
};

const ViewQuizHistory = (props) => {
  const dispatch = useDispatch();
  useEffect(async () => {
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