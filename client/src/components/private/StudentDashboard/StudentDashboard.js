import Logout from '../../../containers/public/Authentication/Logout';
import Leaderboard from '../../../containers/private/Leaderboard/Leaderboard';
import StudentHistory from '../../../containers/private/StudentHistory/StudentHistory';

const StudentDashboard = () => {
  return (
    <>
    <div>
      <Logout />
    </div>
    <Leaderboard />
    <StudentHistory />
    </>
  );
};

export default StudentDashboard;