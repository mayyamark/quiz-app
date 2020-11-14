import Logout from '../../../containers/public/Authentication/Logout';
import Leaderboard from '../../../containers/private/Leaderboard/Leaderboard';
import StudentHistory from '../../../containers/private/StudentHistory/StudentHistory';
import Categories from '../../../containers/private/Categories/Categories';

const StudentDashboard = () => {
  return (
    <>
    <div>
      <Logout />
    </div>
    <Categories />
    <Leaderboard />
    <StudentHistory />
    </>
  );
};

export default StudentDashboard;