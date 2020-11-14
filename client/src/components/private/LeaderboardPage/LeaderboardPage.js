import { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useQueryParams } from '../../../custom-hooks/useQueryParams.js';
import {
  getSearchParam,
  setSearchParam,
  removeSearchParam,
} from '../../../common/manage-search-param.js';
import CustomTable from '../../CustomTable';

const LeaderboardPage = memo((props) => {
  const {
    leaderboardPage,
    loading,
    error,
    onGetLeaderboardPage,
    hasLeaderboardPage,
  } = props;

  const { page } = useQueryParams();
  const history = useHistory();

  const [limit, setLimit] = useState(10);
  useEffect(() => {
    onGetLeaderboardPage(page, limit, '');
  }, [onGetLeaderboardPage, page, limit]);

  const handleOnClick = () => {
    onGetLeaderboardPage(page, limit, getSearchParam());
    history.push(`/leaderboard?page=1&username=${getSearchParam()}`); // Add search query to path or not??
    removeSearchParam();
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : hasLeaderboardPage ? (
        <div id="student-leaderboard-container">
          <h1>Leaderboard</h1>
          <p>Page: {leaderboardPage.currentPage}</p>
          <TextField
            id="outlined-basic"
            label="Search by username.."
            variant="outlined"
            onChange={(ev) => setSearchParam(ev.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Results</InputLabel>
            <Select
              native
              value={limit}
              onChange={(ev) => setLimit(ev.target.value)}
              label="Results"
              inputProps={{
                name: 'limit',
                id: 'outlined-age-native-simple',
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Select>
          </FormControl>
          <Button variant="contained" size="large" color="primary" onClick={handleOnClick}>
            Search
          </Button>
          <CustomTable
            customIdName="student-leaderboard-table"
            tableHead={[
              'No',
              '',
              'Username',
              'First name',
              'Last name',
              'Score',
            ]}
            tableBody={leaderboardPage.students.map((student, index) => {
              return {
                id: <>{(leaderboardPage.currentPage * limit ) - limit + index + 1}</>,
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
              <Link to={`/leaderboard?page=${leaderboardPage.currentPage - 1}`}>
                PREVIOUS
              </Link>
            )}
            {leaderboardPage.hasNextPage && (
              <Link to={`/leaderboard?page=${leaderboardPage.currentPage + 1}`}>
                NEXT
              </Link>
            )}
          </div>
        </div>
      ) : (
        // TODO: Think about better message
        <p>Nothing to show...</p>
      )}
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
