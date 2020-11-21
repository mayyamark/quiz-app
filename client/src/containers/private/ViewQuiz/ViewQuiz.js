import { useState, useEffect } from 'react';
import ViewQuizComponent from '../../../components/private/ViewQuiz/ViewQuiz';
import axios from '../../../axios-config';
import { getToken } from '../../../common/manage-token';
import { useQueryParams } from '../../../custom-hooks/useQueryParams.js';
import { Alert } from '@material-ui/lab';

const ViewQuiz = () => {
  const { id } = useQueryParams();
  const [quiz, setQuiz] = useState();
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      const response = await axios.get(`/quizes/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status == 200) {
        setQuiz(response.data.quiz);
      }
      else {
        setError(response.data.error);
      }
    }
    catch (err) {
      setError(err.message);
    }
  }, []);

  return (quiz ? <ViewQuizComponent quiz={quiz}/> : (error ? <Alert severity="error">{error}</Alert> : <Alert severity="warning">There is no such quiz!!!</Alert>));
};
export default ViewQuiz;