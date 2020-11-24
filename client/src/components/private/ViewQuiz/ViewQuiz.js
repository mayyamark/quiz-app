import { useHistory, useLocation } from 'react-router-dom';
import { TextField, List, Button } from '@material-ui/core';
import ViewQuestion from './ViewQuestion';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../../common/NavBar/NavBar';
import './ViewQuiz.css';

const ViewQuiz = (props) => {
  const location = useLocation();
  const history = useHistory();

  const goToQuizHistorydHandler = () => {
    history.push(`${location.pathname}/${props.quiz.id}/history`);
  };

  const { loading } = props;

  return (
    <>
      <NavBar />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <CssBaseline />
          <Container id="quiz-form-container" maxWidth="md">
            <form id="view-quiz-form" noValidate autoComplete="off">
            <h1>This is how quiz '{props.quiz.name}' looks like:</h1>
              <div id="basic-quiz-info">
                <TextField
                  id="outlined-basic"
                  label="Quiz Name"
                  variant="outlined"
                  className="quiz-name"
                  InputProps={{ readOnly: true }}
                  value={props.quiz.name}
                />
                <TextField
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  value={props.quiz.category}
                />
                <TextField
                  id="outlined-basic"
                  label="Time"
                  type="number"
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  value={props.quiz.time}
                />
              </div>
                {props.quiz.questions && props.quiz.questions.length > 0 ? (
                  <List
                    id="outlined-basic"
                    component="nav"
                    aria-label="questions"
                  >
                    {props.quiz.questions.map((question) => (
                      <ViewQuestion key={question.id} question={question} />
                    ))}
                  </List>
                ) : (
                  <Alert severity="warning">There are no questions!</Alert>
                )}
                <div id="view-history-btn-container">
              <Button
                variant="contained"
                color="primary"
                onClick={goToQuizHistorydHandler}
                id="view-quiz-btn"
              >
                See quiz history{' '}
              </Button>
              </div>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default ViewQuiz;
