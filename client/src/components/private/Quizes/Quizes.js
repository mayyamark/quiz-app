import { memo, useEffect, useState } from 'react';
import CustomTable from '../../CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { useQueryParams } from '../../../custom-hooks/useQueryParams';
import { useAuth } from '../../../auth/AuthContext';
const Quizes = memo((props) => {
  const { quizes, loading, error, onGetQuizes, hasQuizes } = props;
  const { page, category } = useQueryParams();
  const { user } = useAuth();

  const history = useHistory();

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    onGetQuizes(page, limit, category);
  }, [onGetQuizes, page, limit, category]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : hasQuizes ? (
        <div id="quizzes-container">
          <h1>Quizzes</h1>
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
                        <Button onClick={() => history.push(`/solvingQuiz/${quiz.id}`)} variant="contained" color="primary">
                          Solve
                        </Button>
                      ) : (
                        <>
                          Solved:{' '}
                          {new Date(quiz.started)
                            .toLocaleString('en-GB')
                            .slice(0, 10)}
                        </>
                      )
                    ) : (
                      <>
                        <Button onClick={() => history.push(`/solvingQuiz/${quiz.id}`)} variant="contained" color="primary">
                          Solve
                        </Button>
                        <Button variant="contained" color="primary">
                          View
                        </Button>
                      </>
                    )}
                  </>
                ),
              };
            })}
          />
          <div>
            {quizes.hasPreviousPage && (
              <Link
                to={`/quizzes?page=${
                  quizes.currentPage - 1
                }&category=${category}`}
              >
                PREVIOUS
              </Link>
            )}
            {quizes.hasNextPage && (
              <Link
                to={`/quizzes?page=${
                  quizes.currentPage + 1
                }&category=${category}`}
              >
                NEXT
              </Link>
            )}
          </div>
        </div>
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
