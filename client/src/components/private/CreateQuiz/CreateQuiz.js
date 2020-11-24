import { TextField, Button, Select, MenuItem, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../common/NavBar/NavBar';
import CreateQuestion from './CreateQuestion';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      minWidth: 120,
    },
  },
  selectEmpty: {
    margin: theme.spacing(1),
    width: '25ch',
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
      <form className={classes.root} noValidate autoComplete="off">
        {props.quizesState.error}
        <div>
          <TextField
            id="outlined-basic"
            label="Quiz Name"
            variant="outlined"
            onChange={props.handleQuizNameChange}
          />
          <TextField
            id="outlined-basic"
            label="Time Limit"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 60 } }}
            variant="outlined"
            onChange={props.handleTimeLimitChange}
          />
        </div>
        <div>
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
        </div>
        <div>
          <Button
            id="outlined-basic"
            variant="outlined"
            onClick={props.handleAddQuestion}
            className={classes.selectEmpty}
          >
            Add question
          </Button>
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
            <div>There are no questions</div>
          )}
        </div>
        <Button
          id="outlined-basic"
          variant="outlined"
          onClick={props.createAQuiz}
          disabled={disableCreateQuizValidation()}
          className={classes.selectEmpty}
        >
          Create that quiz!
        </Button>
      </form>
    </>
  );
};

export default CreateQuiz;
