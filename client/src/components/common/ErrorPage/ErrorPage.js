import errorImg from './404.png';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const history = useHistory();

  return (
    <>
      <div id="error-page">
        <img src={errorImg} alt="error" />
      <div id="error-btn-container">
        <Button id="error-btn" onClick={() => history.push('/dashboard')} variant="contained">
          BACK TO DASH
        </Button>
      </div>
      </div>
    </>
  );
};

export default ErrorPage;
