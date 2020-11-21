import { memo, useEffect, useState } from 'react';
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
import CustomTable from '../../common/CustomTable/CustomTable';
import SearchIcon from '@material-ui/icons/Search';
import ErrorPage from '../../common/ErrorPage/ErrorPage';
import './LeaderboardPage.css';

const LeaderboardPage = memo((props) => {
  const {
    leaderboardPage,
    loading,
    error,
    onGetLeaderboardPage,
    hasLeaderboardPage,
  } = props;

  const { page } = useQueryParams();

  const [limit, setLimit] = useState(10);
  useEffect(() => {
    onGetLeaderboardPage(page, limit, '');
  }, [onGetLeaderboardPage, page, limit]);

  const handleOnClick = () => {
    onGetLeaderboardPage(1, limit, getSearchParam());
    removeSearchParam();
  };

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : loading ? (
        <CircularProgress />
      ) : hasLeaderboardPage ? (
        <div id="student-leaderboard-container">
          <h1>LEADERBOARD</h1>
          <div id="leaderboard-options">
            <TextField
              id="outlined-helperText"
              label="Type a username.."
              variant="outlined"
              onChange={(ev) => setSearchParam(ev.target.value)}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Results
              </InputLabel>
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
                <option value={20}>20</option>
              </Select>
            </FormControl>
            <Button
              id="search-students"
              variant="contained"
              size="large"
              color="primary"
              onClick={handleOnClick}
            >
              <SearchIcon />
            </Button>
          </div>
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
                id: (
                  <>{leaderboardPage.currentPage * limit - limit + index + 1}</>
                ),
                avatar: <Avatar src={student.avatar} alt="avatar" />,
                username: <>{student.username}</>,
                firstName: <>{student.firstName}</>,
                lastName: <>{student.lastName}</>,
                totalScore: <>{student.totalScore}</>,
              };
            })}
          />
          <div id="leaderboard-page-links">
            {leaderboardPage.hasPreviousPage && (
              <Link to={`/leaderboard?page=${leaderboardPage.currentPage - 1}`}>
                {'<<'}
              </Link>
            )}
            {'  '}
            {leaderboardPage.hasNextPage && (
              <Link to={`/leaderboard?page=${leaderboardPage.currentPage + 1}`}>
                {'>>'}
              </Link>
            )}
          </div>
        </div>
      ) : null}
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
