import Leaderboard from '../../../containers/private/Leaderboard/Leaderboard';
import StudentHistory from '../../../containers/private/StudentHistory/StudentHistory';
import Categories from '../../../containers/private/Categories/Categories';
import NavBar from '../../common/NavBar/NavBar';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <>
    <NavBar />
    <div id="student-dashboard">
      <Categories />
      <StudentHistory />
      <Leaderboard />
    </div>
    </>
  );
};

export default StudentDashboard;