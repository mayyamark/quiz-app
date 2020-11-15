import {
  CREATE_QUIZ_COMPLETED,
  CREATE_QUIZ_FAILED,
  CREATE_QUIZ_GET_CATEGORIES_COMPLETED,
  CREATE_QUIZ_GET_CATEGORIES_FAILED,
} from './action-types';
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

const getCategoriesCompletedAction = (categories) => {
  return {
    type: CREATE_QUIZ_GET_CATEGORIES_COMPLETED,
    categories: categories,
   };
 };

 const getCategoriesFailedAction = (error) => {
   return {
     type: CREATE_QUIZ_GET_CATEGORIES_FAILED,
     error: error,
    };
  };

 export const createQuiz = (quizData) => async (dispatch, getState) => {
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

export const getCategories = async (dispatch, getState) => {
  try {
    const response = await axios.get('/categories', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status == 200){
       dispatch(getCategoriesCompletedAction(response.data));
    } else {
      dispatch(getCategoriesFailedAction(`${response.statusText} ${response.data.error}`));
    }
  }
  catch (err) {
    dispatch(getCategoriesFailedAction(err.message));
  }
};
