import Logout from '../../../containers/public/Authentication/Logout';
import Leaderboard from '../../../containers/private/Leaderboard/Leaderboard';
import StudentHistory from '../../../containers/private/StudentHistory/StudentHistory';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <>
    <div>
      <Link to='/leaderboard?page=1'>Leaderboard</Link>
      <Link to='/history?page=1'>History</Link>
      <Logout />
    </div>
    <Leaderboard />
    <StudentHistory />
    </>
  );
};

export default StudentDashboard;