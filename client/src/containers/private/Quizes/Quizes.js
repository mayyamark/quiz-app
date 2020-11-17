import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { getQuizes } from '../../../redux-store/actions/Quizes';
import Quizes from '../../../components/private/Quizes/Quizes';

const mapStateToProps = state => {
  return {
    quizes: state.quizes.quizes,
    error: state.quizes.error,
    loading: state.quizes.loading,
    hasQuizes: !!state.quizes.quizes.quizes?.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetQuizes: (page, limit, category) => dispatch(getQuizes(page, limit, category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizes, axios);