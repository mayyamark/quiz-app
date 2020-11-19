import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <header className="header">
    <div className="text-box">
      <h1 className="heading-primary">
        <span className="heading-primary-main">Dive in!</span>
        <span className="heading-primary-sub">Check out our quizzes!</span>
      </h1>
      <div className="auth-btns">
        <Link to="/register" className="btn btn-white btn-animated">SIGN UP</Link>
        <Link to="/login" className="btn btn-white btn-animated">LOG IN</Link>
      </div>
    </div>
  </header>
  );
};

export default LandingPage;
