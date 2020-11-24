import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomTable from '../../common/CustomTable/CustomTable';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import './Leaderboard.css';

const Leaderboard = memo((props) => {
  const {
    leaderboard,
    loading,
    error,
    onInitLeaderboard,
    hasLeaderboard,
  } = props;

  useEffect(() => {
    onInitLeaderboard();
  }, [onInitLeaderboard]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : hasLeaderboard ? (
        <div id="student-dashboard-leaderboard-container">
          <Tooltip arrow title="See the full leaderboard!" placement="top">
            <Link to='/leaderboard?page=1' id="leaderboard-link" >Leaderboard</Link>
          </Tooltip>
          <CustomTable
            customIdName="student-dashboard-leaderboard-table"
            tableHead={['No', '', 'Username', 'Score']}
            tableBody={leaderboard.students.map((student, index) => {
              return {
                id: <>{index + 1}</>,
                avatar: <Avatar src={student.avatar} alt="avatar" />,
                username: <>{student.username}</>,
                totalScore: <>{student.totalScore}</>,
              };
            })}
          />
        </div>
      ) : null}
    </>
  );
});

Leaderboard.defaultProps = {
  leaderboard: {},
  error: false,
  loading: false,
  hasLeaderbord: false,
  onInitLeaderboard: () => {},
};

export default Leaderboard;