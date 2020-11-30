import {
  TEACHER_DASH_GET_QUIZZES_LOADING,
  TEACHER_DASH_GET_QUIZZES_COMPLETED,
  TEACHER_DASH_GET_QUIZZES_FAILED,
  TEACHER_DASH_CREATE_CATEGORY_COMPLETED,
  TEACHER_DASH_CREATE_CATEGORY_FAILED,
} from './action-types';
import axios from '../../axios-config';
import { initCategories } from './Categories';
import { showInfoAlert } from '../../components/common/Alerts/Alerts';

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

export const getQuizzes = (forTeacher) => (dispatch, getState) => {
  dispatch(teacherDashGetQuizzesStartedAction(true));
  axios.get(`/quizzes?page=1&limit=5&teacher=${forTeacher}`)
    .then (response => dispatch(teacherDashGetQuizzesCompletedAction(response.data)))
    .catch (err => dispatch(teacherDashGetQuizzesFailedAction(err.message)))
    .finally (() => dispatch(teacherDashGetQuizzesStartedAction(false)));
};

export const createCategory = (categoryName) => (dispatch, getState) => {
  axios.post('/categories', {
    name: categoryName,
  })
  .then (() => {
    initCategories()(dispatch);
    dispatch(teacherDashCreateCategoryCompletedAction());
    showInfoAlert(
      'Success!',
      `Now there is a category '${categoryName}'!`,
      'success',
      'Nice!',
    );
  })
  .catch (err => {
    dispatch(teacherDashCreateCategoryFailedAction(err.message));
    showInfoAlert(
      'Sorry, there was an error!',
      `${err.message}`,
      'error',
      'OK :(',
    );
  });
};
