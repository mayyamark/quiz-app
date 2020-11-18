import { useState, useEffect } from 'react';
import ViewQuizComponent from '../../../components/private/ViewQuiz/ViewQuiz';
import axios from '../../../axios-config';
import { getToken } from '../../../common/manage-token';
import { useQueryParams } from '../../../custom-hooks/useQueryParams.js';

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

  return (quiz ? <ViewQuizComponent quiz={quiz}/> : (error ? <div>{error}</div> : <div>There is no such quiz!!!</div>)
  );
};
export default ViewQuiz;