import Logout from '../../../containers/public/Authentication/Logout';
import Leaderboard from '../../../containers/private/Leaderboard/Leaderboard';
import StudentHistory from '../../../containers/private/StudentHistory/StudentHistory';
import Categories from '../../../containers/private/Categories/Categories';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <>
    <div>
      <Link to='/leaderboard?page=1'>Leaderboard</Link>
      <Link to='/history?page=1'>History</Link>
      <Logout />
    </div>
    <div id="student-dashboard">
      <Leaderboard />
      <Categories />
      <StudentHistory />
    </div>
    </>
  );
};

export default StudentDashboard;