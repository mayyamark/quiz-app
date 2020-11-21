import { memo, useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import { useQueryParams } from '../../../custom-hooks/useQueryParams.js';
import {
  getSearchParam,
  setSearchParam,
  removeSearchParam,
} from '../../../common/manage-search-param.js';
import CustomTable from '../../common/CustomTable/CustomTable';
import ErrorPage from '../../common/ErrorPage/ErrorPage';
import './StudentHistoryPage.css';

const StudentHistoryPage = memo((props) => {
  const {
    studentHistoryPage,
    loading,
    error,
    onGetStudentHistoryPage,
    hasStudentHistoryPage,
  } = props;

  const { user } = useAuth();
  const { page } = useQueryParams();
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    onGetStudentHistoryPage(user.sub, page, limit, '');
  }, [onGetStudentHistoryPage, user.sub, limit, page]);

  const handleOnClick = () => {
    onGetStudentHistoryPage(user.sub, page, limit, getSearchParam());
    removeSearchParam();
  };

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : loading ? (
        <CircularProgress />
      ) : hasStudentHistoryPage ? (
        <div id="student-history-container">
          <h1>HISTORY</h1>
          <div id="history-options">
            <TextField
              id="outlined-helperText"
              label="Type a quiz name.."
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
              </Select>
            </FormControl>
            <Button
              id="search-quizzes"
              variant="contained"
              size="large"
              color="primary"
              onClick={handleOnClick}
            >
              <SearchIcon />
            </Button>
          </div>
          <CustomTable
            customIdName="student-history-table"
            tableHead={[
              'No',
              'Quiz',
              'Category',
              'Started',
              'Finished',
              'Score',
            ]}
            tableBody={studentHistoryPage.history.map((history, index) => {
              return {
                id: (
                  <>
                    {studentHistoryPage.currentPage * limit - limit + index + 1}
                  </>
                ),
                quizName: <>{history.name}</>,
                categoryName: <>{history.category}</>,
                started: (
                  <>
                    {moment(new Date(history.started)).format(
                      'MMM Do YYYY, h:mm:ss a',
                    )}
                  </>
                ),
                finished: (
                  <>
                    {moment(new Date(history.finished)).format(
                      'MMM Do YYYY, h:mm:ss a',
                    )}
                  </>
                ),
                score: <>{history.score}</>,
              };
            })}
          />
          <div id="history-page-links">
            {studentHistoryPage.hasPreviousPage && (
              <Link to={`/history?page=${studentHistoryPage.currentPage - 1}`}>
                {'<<'}
              </Link>
            )}
            {studentHistoryPage.hasNextPage && (
              <Link to={`/history?page=${studentHistoryPage.currentPage + 1}`}>
                {'>>'}
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
});

StudentHistoryPage.defaultProps = {
  studentHistoryPage: {},
  error: false,
  loading: false,
  hasStudentHistoryPage: false,
  onGetStudentHistoryPage: () => {},
};

export default StudentHistoryPage;
