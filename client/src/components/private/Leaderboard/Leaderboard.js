import { memo, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CustomTable from '../../CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorPage from '../../common/ErrorPage/ErrorPage';
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
      {error ? (
        <ErrorPage />
      ) : loading ? (
        <CircularProgress />
      ) : hasLeaderboard ? (
        <div id="student-dashboard-leaderboard-container">
          <h1>Leaderboard</h1>
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
