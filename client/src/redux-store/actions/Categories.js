import {
  SET_CATEGORIES,
  FETCH_CATEGORIES_FAILED,
  START_LOADING_CATEGORIES,
  STOP_LOADING_CATEGORIES,
} from './action-types';
import axios from '../../axios-config.js';

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

const fetchCategoriesFailed = () => {
  return {
    type: FETCH_CATEGORIES_FAILED,
  };
};

const startLoadingCategories = () => {
  return {
    type: START_LOADING_CATEGORIES,
  };
};

const stopLoadingCategories = () => {
  return {
    type: STOP_LOADING_CATEGORIES,
  };
};

const initCategories = () => {
  return dispatch => {
    dispatch(startLoadingCategories());
    axios.get('/categories')
    .then(res => {
      dispatch(setCategories(res.data));
    })
    .catch(err => dispatch(fetchCategoriesFailed()))
    .finally(() => dispatch(stopLoadingCategories()));
  };
};

export {
  setCategories,
  fetchCategoriesFailed,
  startLoadingCategories,
  stopLoadingCategories,
  initCategories,
};
