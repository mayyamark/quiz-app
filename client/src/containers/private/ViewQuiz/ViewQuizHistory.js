import { useEffect } from 'react';
import { withRouter } from 'react-router';
import ViewQuizHistoryComponent from '../../../components/private/ViewQuiz/ViewQuizHistory';
import { connect , useDispatch } from 'react-redux';
import { getQuizTakenHistory } from '../../../redux-store/actions/Quizes';

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
      <div>{props.error}</div>
      :
      <div>There is no such quiz!!!</div>
    )
  );
};
export default connect(mapStateToProps)(withRouter(ViewQuizHistory));