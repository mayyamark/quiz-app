import {
  TEACHER_DASH_GET_QUIZZES_LOADING,
  TEACHER_DASH_GET_QUIZZES_COMPLETED,
  TEACHER_DASH_GET_QUIZZES_FAILED,
  TEACHER_DASH_CREATE_CATEGORY_COMPLETED,
  TEACHER_DASH_CREATE_CATEGORY_FAILED,
} from './action-types';
import axios from '../../axios-config';
import { getToken } from '../../common/manage-token';
import { initCategories } from './Categories';

const teacherDashGetQuizzesStartedAction = (loading) => {
  return {
    type: TEACHER_DASH_GET_QUIZZES_LOADING,
    payload: loading,
  };
};

const teacherDashGetQuizzesCompletedAction = (quizzes) => {
  return {
    type: TEACHER_DASH_GET_QUIZZES_COMPLETED,
    payload: quizzes,
  };
};

const teacherDashGetQuizzesFailedAction = (error) => {
  return {
    type: TEACHER_DASH_GET_QUIZZES_FAILED,
    payload: error,
  };
};

const teacherDashCreateCategoryCompletedAction = () => {
    return {
    type: TEACHER_DASH_CREATE_CATEGORY_COMPLETED,
  };
};

const teacherDashCreateCategoryFailedAction = (error) => {
  return {
    type: TEACHER_DASH_CREATE_CATEGORY_FAILED,
    payload: error,
  };
};

export const getQuizzes = (forTeacher) => async (dispatch, getState) => {
  dispatch(teacherDashGetQuizzesStartedAction(true));
  try {
    const response = await axios.get(`/quizes?page=1&limit=5&teacher=${forTeacher}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status == 200){
      dispatch(teacherDashGetQuizzesCompletedAction(response.data));
    } else {
      dispatch(teacherDashGetQuizzesFailedAction(`${response.statusText} ${response.data.error}`));
    }
  }
  catch (err) {
    dispatch(teacherDashGetQuizzesFailedAction(err.message));
  }
  dispatch(teacherDashGetQuizzesStartedAction(false));
};

export const createCategory = (categoryName) => async (dispatch, getState) => {
  try {
    const response = await axios.post('/categories', {
        name: categoryName,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    if (response.status == 201){
      initCategories()(dispatch);
      dispatch(teacherDashCreateCategoryCompletedAction());
    } else {
      dispatch(teacherDashCreateCategoryFailedAction(`${response.statusText} ${response.data.error}`));
    }
  }
  catch (err) {
    dispatch(teacherDashCreateCategoryFailedAction(err.message));
  }
};
