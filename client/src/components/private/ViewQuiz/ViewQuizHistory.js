import { useHistory } from 'react-router-dom';
import { List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewQuizHistoryItem from './ViewQuizHistoryItem';

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

const ViewQuizHistory = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const goToDashboardHandler = () => {
    history.push('/dashboard');
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        {props.quizHistory && props.quizHistory.length > 0 ?
          <List id="outlined-basic" component="nav" className={classes.root} aria-label="questions">
            {
            props.quizHistory.map(historyItem => <ViewQuizHistoryItem historyItem={historyItem}/>)
            }
          </List>
         :
          <div>There is no quiz history data</div>}
      </div>
      <Button variant="contained" color="primary" onClick={goToDashboardHandler}>Dashboard </Button>
    </form>
  );
};

export default ViewQuizHistory;