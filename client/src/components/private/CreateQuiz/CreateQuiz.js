import { TextField, Button, Select, MenuItem, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Alert } from '@material-ui/lab';
import NavBar from '../../common/NavBar/NavBar';
import CreateQuestion from './CreateQuestion';
import './CreateQuiz.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
    },
  },
  selectEmpty: {
    // margin: theme.spacing(1),
  },
}));

const CreateQuiz = (props) => {
  const classes = useStyles();

  const invalidQuestionCheck = (question) => {
    // A question must have text...
    if (!question.text) {
      return true;
    }

    //... points have to be set ...
    if (question.points === 0) {
      return true;
    }

    //... at least two possible answers...
    if (!question.answers || question.answers.length < 2) {
      return true;
    }

    //...each answer should have text...
    if (question.answers.filter((a) => !a.text).length > 0) {
      return true;
    }

    //...and at least one answer must be marked as true
    if (question.answers.filter((a) => a.isTrue).length === 0) {
      return true;
    }

    return false;
  };

  const disableCreateQuizValidation = () => {
    // A quiz must have a name and time limit
    if (!props.quizName || props.quizTimeLimit === 0) {
      return true;
    }

    //...contain at least two questions...
    if (props.questions.length < 2) {
      return true;
    }

    //...and the questions must be valid
    if (props.questions.filter((q) => invalidQuestionCheck(q)).length > 0) {
      return true;
    }

    return false;
  };
  let dummyKey = 0;
  return (
    <>
      <NavBar />
      <CssBaseline />
      <Container id="quiz-form-container" maxWidth="md">
        <h1>You are about to create a new quiz!</h1>
        <form
          id="create-quiz-form"
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          {props.quizesState.error}
        <div id="basic-quiz-info">
          <TextField
            id="outlined-basic"
            label="Quiz Name"
            variant="outlined"
            className="quiz-name"
            onChange={props.handleQuizNameChange}
          />
          <Select
            id="outlined-basic"
            label="Category"
            variant="outlined"
            value={props.category}
            onChange={props.handleCategoryChange}
            className={classes.selectEmpty}
          >
            {props.quizesState.categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="outlined-basic"
            label="Time"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 60 } }}
            variant="outlined"
            onChange={props.handleTimeLimitChange}
          />
        </div>
          {props.questions && props.questions.length > 0 ? (
            <List
              id="outlined-basic"
              component="nav"
              className={classes.root}
              aria-label="questions"
            >
              {props.questions.map((question) => (
                <CreateQuestion
                  key={dummyKey++}
                  question={question}
                  handleQuestionTextChange={props.handleQuestionTextChange}
                  handlePointsChange={props.handlePointsChange}
                  handleAnswerChange={props.handleAnswerChange}
                  handleAddAnswer={props.handleAddAnswer}
                  handleDeleteQuestion={props.handleDeleteQuestion}
                  handleSetAnswerTrue={props.handleSetAnswerTrue}
                />
              ))}
            </List>
          ) : (
            <Alert id="create-quiz-alert" severity="warning">You must add at least 2 questions!</Alert>
          )}
          <div id="create-quiz-btn-container" >
          <Button
            id="outlined-basic"
            variant="outlined"
            onClick={props.handleAddQuestion}
            className={classes.selectEmpty}
            className="create-quiz-btn"
          >
            Add a question
          </Button>{' '}
          <Button
            id="outlined-basic"
            variant="contained"
            color="primary"
            onClick={props.createAQuiz}
            disabled={disableCreateQuizValidation()}
            className={classes.selectEmpty}
            className="create-quiz-btn"
          >
            Create that quiz!
          </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreateQuiz;
