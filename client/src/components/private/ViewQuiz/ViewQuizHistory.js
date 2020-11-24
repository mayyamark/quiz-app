import { useHistory } from 'react-router-dom';
import { List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewQuizHistoryItem from './ViewQuizHistoryItem';
import { Alert } from '@material-ui/lab';
import NavBar from '../../common/NavBar/NavBar';

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
  const quizHistory = props.quizHistory.history;
  const classes = useStyles();
  const history = useHistory();
  const goToDashboardHandler = () => {
    history.push('/dashboard');
  };
  return (
    <>
      <NavBar />

      <form className={classes.root} noValidate autoComplete="off">
        <div>
          {quizHistory && quizHistory.length > 0 ? (
            <List
              id="outlined-basic"
              component="nav"
              className={classes.root}
              aria-label="questions"
            >
              {quizHistory.map((historyItem) => (
                <ViewQuizHistoryItem
                  key={historyItem.username}
                  historyItem={historyItem}
                />
              ))}
            </List>
          ) : (
            <Alert severity="warning">There is no quiz history data</Alert>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={goToDashboardHandler}
        >
          Dashboard{' '}
        </Button>
      </form>
    </>
  );
};

export default ViewQuizHistory;
