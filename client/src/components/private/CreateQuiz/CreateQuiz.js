import { TextField, Button, Select, MenuItem, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {props.quizesState.error}
      <div>
        <TextField id="outlined-basic" label="Quiz Name" variant="outlined" onChange={props.handleQuizNameChange}/>
        <TextField id="outlined-basic" label="Time Limit" type="number" InputProps={{ inputProps: { min: 1, max: 60 } }} variant="outlined" onChange={props.handleTimeLimitChange}/>
      </div>
      <div>
        <Select id="outlined-basic" label="Category" variant="outlined" value={props.category.id} onChange={props.handleCategoryChange} className={classes.selectEmpty}>
          {props.quizesState.categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
        </Select>
      </div>
      <div>
        <Button id="outlined-basic" variant="outlined" onClick={props.handleAddQuestion} className={classes.selectEmpty}>Add question</Button>
        {props.questions && props.questions.length > 0 ?
          <List id="outlined-basic" component="nav" className={classes.root} aria-label="questions">
            {
            props.questions.map(question =>
              <CreateQuestion question={question}
                              handleQuestionTextChange={props.handleQuestionTextChange}
                              handlePointsChange={props.handlePointsChange}
                              handleAnswerChange={props.handleAnswerChange}
                              handleAddAnswer={props.handleAddAnswer}
                              handleDeleteQuestion={props.handleDeleteQuestion}
                              handleSetAnswerTrue={props.handleSetAnswerTrue}/>)
            }
          </List>
         :
          <div>There are no questions</div>}
      </div>
      <Button id="outlined-basic" variant="outlined" onClick={props.createAQuiz} disabled={props.questions.length < 2} className={classes.selectEmpty}>Create that quiz!</Button>
    </form>
  );
};

export default CreateQuiz;