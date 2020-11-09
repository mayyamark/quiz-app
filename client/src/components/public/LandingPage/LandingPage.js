import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      &nbsp;&nbsp;
      <Link to="/register">Register</Link>
  </div>
  );
};

export default LandingPage;
