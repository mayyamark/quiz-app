import {
  SET_CATEGORIES,
  FETCH_CATEGORIES_FAILED,
  START_LOADING_CATEGORIES,
  STOP_LOADING_CATEGORIES,
} from '../actions/action-types';

const initialState = {
  categories: {},
  error: false,
  loading: false,
};

const setCategories = (state, action) => {
  return {
    ...state,
    ... { categories: action.categories },
  };
};

const fetchCategoriesFailed = (state, action) => {
  return { ...state, error: true };
};

const startLoadingCategories = (state, action) => {
  return { ...state, loading: true };
};

const stopLoadingCategories = (state, action) => {
  return { ...state, loading: false };
};

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return setCategories(state, action);
    case FETCH_CATEGORIES_FAILED:
      return fetchCategoriesFailed(state, action);
    case START_LOADING_CATEGORIES:
      return startLoadingCategories(state, action);
    case STOP_LOADING_CATEGORIES:
      return stopLoadingCategories(state, action);
    default:
      return state;
  }
};

export default CategoriesReducer;