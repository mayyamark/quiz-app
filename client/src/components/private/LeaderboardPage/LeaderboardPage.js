import { memo, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CustomTable from '../../CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQueryParams } from '../../../custom-hooks/useQueryParams.js';
import { Link } from 'react-router-dom';
// import './Leaderboard.css';

const LeaderboardPage = memo((props) => {
  const { leaderboardPage, loading, error, onGetLeaderboardPage, hasLeaderboardPage } = props;
  const { page } = useQueryParams();
console.log(leaderboardPage.students);

  useEffect(() => {
    onGetLeaderboardPage(page);
  }, [onGetLeaderboardPage, page]);

    return (
      <>
        {loading ?
          <CircularProgress /> :
          hasLeaderboardPage ?
            <div id="student-leaderboard-container" >
              <h1>Leaderboard</h1>
              <CustomTable
                customIdName="student-leaderboard-table"
                tableHead={['No', '', 'Username', 'First name', 'Last name', 'Score']}
                tableBody={leaderboardPage.students.map((student, index) => {
                  return {
                    id: <>{index + 1}</>,
                    avatar: <Avatar src={student.avatar} alt="avatar" />,
                    username: <>{student.username}</>,
                    firstName: <>{student.firstName}</>,
                    lastName: <>{student.lastName}</>,
                    totalScore: <>{student.totalScore}</>,
                  };
                })}
              />
                  <div>
                    {leaderboardPage.hasPreviousPage && (
                        <Link
                          to={`/leaderboard?page=${
                            leaderboardPage.currentPage - 1
                          }`}
                        >
                          PREVIOUS
                        </Link>
                    )}
                    {leaderboardPage.hasNextPage && (
                        <Link
                          to={`/leaderboard?page=${
                            leaderboardPage.currentPage + 1
                          }`}
                        >
                          NEXT
                        </Link>
                    )}
                  </div>
            </div>
          : null
        }
      </>
    );
});

LeaderboardPage.defaultProps = {
  leaderboardPage: {},
  error: false,
  loading: false,
  hasLeaderbord: false,
  onGetLeaderboardPage: () => {},
};

export default LeaderboardPage;