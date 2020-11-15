import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import createQuiz from '../../../redux-store/actions/quizes';
import getCategories from '../../../redux-store/actions/categories';
import { makeStyles } from '@material-ui/core/styles';

const mapStateToProps = (state) => {
  return {
      categoriesState: state.categories,
      quizesState: state.quizes,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      minWidth: 120,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateQuiz = (props) => {
  const classes = useStyles();
  const {categoriesState, quizesState} = props;

  const dispatch = useDispatch();

  const createAQuiz = () => {
    dispatch(createQuiz(createQuizData()));
  };
  useEffect(() => {
    dispatch(getCategories);
  }, []);

  const createQuizData = () => {
    return {
        name: name,
        timeLimit: timeLimit,
        category: categoriesState.categories.filter(cat => cat.id === category)[0].name,
        questions: questions,
    };
  };

  const [name, setName] = useState();
  const [timeLimit, setTimeLimit] = useState();
  const [category, setCategory] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleQuizNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };
  const handleAddQuestion = (event) => {
    questions.push( {text: '', points: 0});
    setQuestions([...questions]);
  };
  const handlDeleteQuestion = (question) => (event) => {
    setQuestions(questions.filter(q => q != question));
  };
  const handleAddAnswer = (question) => (event) => {
    if (!question.answers)
      question.answers = [];

    question.answers.push({text: '', isTrue: false});
    setQuestions([...questions]);
  };

  const handleSetAnswerTrue = (answer) => (event) => {
    answer.isTrue = !answer.isTrue;
    setQuestions([...questions]);
  };
  const handleAnswerChange =  (answer) => (event) => {
    answer.text = event.target.value;
    setQuestions([...questions]);
  };

  const handleQuestionTextChange = (question) => (event) => {
    question.text = event.target.value;
    setQuestions([...questions]);
  };

  const handlePointsChange = (question) => (event) => {
    question.points = event.target.value;
    setQuestions([...questions]);
  };

  return ((categoriesState.categories && categoriesState.categories.length > 0) ?
    <form className={classes.root} noValidate autoComplete="off">
      {quizesState.error}
      <div>
        <TextField id="outlined-basic" label="Quiz Name" variant="outlined" onChange={handleQuizNameChange}/>
        <TextField id="outlined-basic" label="Time Limit" type="number" InputProps={{ inputProps: { min: 1, max: 60 } }} variant="outlined" onChange={handleTimeLimitChange}/>
      </div>
      <div>
        <Select id="outlined-basic" label="Category" variant="outlined" value={category.id} onChange={handleCategoryChange} className={classes.selectEmpty}>
          {categoriesState.categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
        </Select>
      </div>
      <div>
        <Button id="outlined-basic" variant="outlined" onClick={handleAddQuestion}>Add question</Button>
        {questions && questions.length > 0 ?
          <List id="outlined-basic" component="nav" className={classes.root} aria-label="questions">
            {questions.map(question =>
            <ListItem>
              <TextField label="Question" value={`${question.text}`} onChange={handleQuestionTextChange(question)}/>
              <TextField label="Points" value={`${question.points}`} type="number" InputProps={{ inputProps: { min: 1, max: 60 } }} onChange={handlePointsChange(question)}/>
              {question.answers &&
              <List component="nav"aria-label="answers">
              {question.answers.map(answer =>
                <ListItem>
                  <TextField label="Answer" value={`${answer.text}`} onChange={handleAnswerChange(answer)}/>
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleSetAnswerTrue(answer)}
                    checked={answer.isTrue}
                  />
                </ListItemSecondaryAction>
                </ListItem>)

              }
              </List>
              }
              <Button id="outlined-basic" variant="outlined" onClick={handleAddAnswer(question)}>Add answer</Button>
              <Button id="outlined-basic" variant="outlined" onClick={handlDeleteQuestion(question)}>Delete</Button>
            </ListItem>)
            }
         </List> : <div>There are no questions</div>}
      </div>
      <Button id="outlined-basic" variant="outlined" onClick={createAQuiz}>Create that quiz!</Button>
    </form>
    :
    <div>
      There are no categories!
    </div>
  );
};
export default connect(mapStateToProps)(CreateQuiz);