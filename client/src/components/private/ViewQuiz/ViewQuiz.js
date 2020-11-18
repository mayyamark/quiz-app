import { useHistory } from 'react-router-dom';
import { TextField, List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewQuestion from './ViewQuestion';

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

const ViewQuiz = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const goToDashboardHandler = () => {
    history.push('/dashboard');
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="outlined-basic" label="Quiz Name" variant="outlined" InputProps={{readOnly: true}} value={props.quiz.name}/>
        <TextField id="outlined-basic" label="Time Limit" type="number" variant="outlined" InputProps={{readOnly: true}} value={props.quiz.time}/>
      </div>
      <div>
        <TextField id="outlined-basic" label="Category" variant="outlined" InputProps={{readOnly: true}} value={props.quiz.category}/>
      </div>
      <div>
        {props.quiz.questions && props.quiz.questions.length > 0 ?
          <List id="outlined-basic" component="nav" className={classes.root} aria-label="questions">
            {
            props.quiz.questions.map(question => <ViewQuestion question={question}/>)
            }
          </List>
         :
          <div>There are no questions</div>}
      </div>
      <Button variant="contained" color="primary" onClick={goToDashboardHandler}>Dashboard </Button>
    </form>
  );
};

export default ViewQuiz;