import { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useQueryParams } from '../../../custom-hooks/useQueryParams.js';
import {
  getSearchParam,
  setSearchParam,
  removeSearchParam,
} from '../../../common/manage-search-param.js';
import CustomTable from '../../CustomTable';

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
  const history = useHistory();

  useEffect(() => {
    onGetStudentHistoryPage(user.sub, page, '');
  }, [onGetStudentHistoryPage, user.sub, page]);

  const handleOnClick = () => {
    onGetStudentHistoryPage(user.sub, page, getSearchParam());
    history.push(`/history?page=1&quiz=${getSearchParam()}`); // Add search query to path or not??
    removeSearchParam();
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : hasStudentHistoryPage ? (
        <div id="student-history-container">
          <h1>History</h1>
          <p>Page: {studentHistoryPage.currentPage}</p>
          <TextField
            id="outlined-basic"
            label="Search by quiz name.."
            variant="outlined"
            onChange={(ev) => setSearchParam(ev.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleOnClick}>
            Search
          </Button>
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
                // TODO: Find out how to make a better numeration
                id: <>{index + 1}</>,
                quizName: <>{history.name}</>,
                categoryName: <>{history.category}</>,
                started: <>{new Date(history.started).toLocaleString('en-GB')}</>,
                finished: <>{new Date(history.finished).toLocaleString('en-GB')}</>,
                score: <>{history.score}</>,
              };
            })}
          />
          <div>
            {studentHistoryPage.hasPreviousPage && (
              <Link to={`/history?page=${studentHistoryPage.currentPage - 1}`}>
                PREVIOUS
              </Link>
            )}
            {studentHistoryPage.hasNextPage && (
              <Link to={`/history?page=${studentHistoryPage.currentPage + 1}`}>
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

StudentHistoryPage.defaultProps = {
  studentHistoryPage: {},
  error: false,
  loading: false,
  hasStudentHistoryPage: false,
  onGetStudentHistoryPage: () => {},
};

export default StudentHistoryPage;
