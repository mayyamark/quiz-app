import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { initCategories } from '../../../redux-store/actions/Categories';
import Categories from '../../../components/private/Categories/Categories';

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
    error: state.categories.error,
    loading: state.categories.loading,
    hasCategories: !!state.categories.categories?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitCategories: () => dispatch(initCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories, axios);