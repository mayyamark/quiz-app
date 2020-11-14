import { CREATE_QUIZ_COMPLETED, CREATE_QUIZ_FAILED } from './action-types';
import axios from '../../axios-config.js';
import { getToken } from '../../common/manage-token.js';

const createQuizCompletedAction = (quiz) => {
  return {
    type: CREATE_QUIZ_COMPLETED,
    quiz: quiz,
  };
};

const createQuizFailedAction = (error) => {
  return {
    type: CREATE_QUIZ_FAILED,
    error: error,
  };
};

const createQuiz = (quizData) => async (dispatch, getState) => {
  try {
    const response = await axios.post('/quizes', quizData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status == 201){
      dispatch(createQuizCompletedAction(response.data));
    } else {
      dispatch(createQuizFailedAction(`${response.statusText} ${response.data.error}`));
    }
  }
  catch (err) {
    dispatch(createQuizFailedAction(err.message));
  }
};

export default createQuiz;  