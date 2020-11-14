import { GET_CATEGORIES_COMPLETED, GET_CATEGORIES_FAILED } from './action-types';
import axios from '../../axios-config.js';
import { getToken } from '../../common/manage-token.js';

const getCategoriesCompletedAction = (categories) => {
  return {
    type: GET_CATEGORIES_COMPLETED,
    categories: categories,
  };
};

const getCategoriesFailedAction = (error) => {
  return {
    type: GET_CATEGORIES_FAILED,
    error: error,
  };
};

const getCategories = async (dispatch, getState) => {
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

export default getCategories;