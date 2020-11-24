import { memo, useEffect, useState } from 'react';
import moment from 'moment';
import CustomTable from '../../common/CustomTable/CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { useQueryParams } from '../../../custom-hooks/useQueryParams';
import { useAuth } from '../../../auth/AuthContext';
import { showConfirmAlert } from '../../common/Alerts/Alerts';
import ErrorPage from '../../common/ErrorPage/ErrorPage';
import teachersAvatars from '../../../avatars/teachers/teachers-avatars.js'; // don't remove it!
import './Quizzes.css';
import NavBar from '../../common/NavBar/NavBar';

const Quizes = memo((props) => {
  const { quizes, loading, error, onGetQuizes, hasQuizes } = props;
  const { page, category } = useQueryParams();
  const { user } = useAuth();

  const history = useHistory();

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    onGetQuizes(page, limit, category);
  }, [onGetQuizes, page, limit, category]);

  const viewQiuzHandler = (id) => () => {
    history.push(`/view-quiz?id=${id}`);
  };

  const startSovlingHandler = (id) => {
    showConfirmAlert(
      'Are you sure?',
      'You have only one chance!',
      'warning',
      true,
      history,
      `/solvingQuiz/${id}`,
    );
  };

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : loading ? (
        <CircularProgress />
      ) : hasQuizes ? (
        <>
          <NavBar />
          <div id="quizzes-container">
            <h1>QUIZZES</h1>
            <div id="quizzes-options">
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
            </div>
            <CustomTable
              customIdName="quizzes-table"
              tableHead={[
                'No',
                'Quiz Name',
                'Time For Solving',
                '',
                'Created By',
                ' ',
              ]}
              tableBody={quizes.quizes.map((quiz, index) => {
                return {
                  id: <>{quizes.currentPage * limit - limit + index + 1}</>,
                  name: <>{quiz.name}</>,
                  time: <>{quiz.time}</>,
                  avatar: <Avatar src={quiz.avatar} alt="avatar" />,
                  teacher: <>{`${quiz.firstName} ${quiz.lastName}`}</>,
                  buttons: (
                    <>
                      {user.role === 'student' ? (
                        !quiz.started ? (
                          <Button
                            onClick={() => startSovlingHandler(quiz.id)}
                            variant="contained"
                            color="primary"
                          >
                            Solve
                          </Button>
                        ) : (
                          <>{`Solved: ${moment(history.started).calendar()}`}</>
                        )
                      ) : (
                        <>
                          <Button
                            onClick={() => startSovlingHandler(quiz.id)}
                            variant="contained"
                            color="primary"
                          >
                            Solve
                          </Button>
                          {'  '}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={viewQiuzHandler(quiz.id)}
                          >
                            View
                          </Button>
                        </>
                      )}
                    </>
                  ),
                };
              })}
            />
            <div id="quizzes-page-links">
              {quizes.hasPreviousPage && (
                <Link
                  to={`/quizzes?page=${
                    quizes.currentPage - 1
                  }&category=${category}`}
                >
                  {'<<'}
                </Link>
              )}
              {quizes.hasNextPage && (
                <Link
                  to={`/quizzes?page=${
                    quizes.currentPage + 1
                  }&category=${category}`}
                >
                  {'>>'}
                </Link>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
});

Quizes.defaultProps = {
  quizes: {},
  error: false,
  loading: false,
  hasQuizes: false,
  getQuizes: () => {},
};

export default Quizes;