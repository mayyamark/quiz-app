import axios from '../../../axios-config.js';
import { connect } from 'react-redux';
import { getQuizes } from '../../../redux-store/actions/Quizes';
import { setSolvingInfo } from '../../../redux-store/actions/StudentHistory';
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
    onSetSolvingInfo: () => dispatch(setSolvingInfo({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizes, axios);