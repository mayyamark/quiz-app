import { GET_CATEGORIES_COMPLETED, GET_CATEGORIES_FAILED } from '../actions/action-types';

const initialState = {};

const createCategoriesState = (action) => {
  return {
    categories: action.categories,
  };
};

const failedCategoriesState = (action) => {
  return {
    error: action.error,
  };
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_COMPLETED:
      return createCategoriesState(action);
    case GET_CATEGORIES_FAILED:
      return failedCategoriesState(action);
    default: return state;
  }
};

export default categoriesReducer;