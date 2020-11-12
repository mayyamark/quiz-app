import Logout from '../../../containers/public/Authentication/Logout';
import { Link } from 'react-router-dom';
import Leaderboard from '../../../containers/private/Leaderboard/Leaderboard';

const StudentDashboard = () => {
  return (
    <>
    <div>
      <Logout />
    </div>
    <Leaderboard />
    </>
  );
};

export default StudentDashboard;