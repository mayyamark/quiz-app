import errorImg from './404.png';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div id="error-page">
      <img
        src={errorImg}
        alt="error"
      />
    </div>
  );
};

export default ErrorPage;
