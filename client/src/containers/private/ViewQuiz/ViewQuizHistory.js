import { useState, useEffect } from 'react';
import ViewQuizHistoryComponent from '../../../components/private/ViewQuiz/ViewQuizHistoryComponent';
import { connect , useDispatch } from 'react-redux';
import { useQueryParams } from '../../../custom-hooks/useQueryParams';
import { getQuizTakenHistory } from '../../../redux-store/actions/Quizes';

const mapStateToProps = (state) => {
  return {
    quizHistory: state.quizes.quizTakenHistory,
    error: state.quizes.error,
  };
};

const ViewQuizHistory = (props) => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getQuizTakenHistory(id));
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
export default connect(mapStateToProps)(ViewQuizHistory);