import Link from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = (props) => {
  const { reasons, path, pageName } = props;

  return (
    <div className="error-container">
      <h1 className="error-title">We are sorry! An error has occurred!</h1>
      <h4 className="error-subtitle">Here are some possible reasons:</h4>
      <div className="error-list">
        {reasons.map((reason, index) => <p className="error-bullet" key={reason}>{`${index + 1}. ${reason}`}</p>)}
      </div>
      <Link to={path} >Go Back To {pageName}</Link>
    </div>
  );
};

export default ErrorPage;