import { useState, useEffect } from 'react';
import ViewQuizComponent from '../../../components/private/ViewQuiz/ViewQuiz';
import axios from '../../../axios-config';
import { getToken } from '../../../common/manage-token';
import { useQueryParams } from '../../../custom-hooks/useQueryParams.js';
import { Alert } from '@material-ui/lab';

const ViewQuiz = () => {
  const { id } = useQueryParams();
  const [viewQuizState, setViewQuizState] = useState({
    quiz: null,
    error: null,
    loading: true,
  });
  useEffect(async () => {
    let newState = {
      ...viewQuizState,
    };
    try {
      const response = await axios.get(`/quizes/${id}`);
      newState.quiz = response.data.quiz;
      newState.error = null;
    }
    catch (err) {
      newState.error = err.message;
    }
    newState.loading = false;
    setViewQuizState(newState);
  }, []);

  return (viewQuizState.quiz || viewQuizState.loading ? <ViewQuizComponent loading={viewQuizState.loading} quiz={viewQuizState.quiz}/> : (viewQuizState.error ? <Alert severity="error">{viewQuizState.error}</Alert> : <Alert severity="warning">There is no such quiz!!!</Alert>));
};
export default ViewQuiz;