import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Leaderboard from '../../../containers/private/Leaderboard/Leaderboard';
import StudentHistory from '../../../containers/private/StudentHistory/StudentHistory';
import Categories from '../../../containers/private/Categories/Categories';
import NavBar from '../../common/NavBar/NavBar';
import './StudentDashboard.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper1: {
    padding: theme.spacing(2),
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 280,
  },
  paper2: {
    padding: theme.spacing(2),
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 520,
  },
  paper3: {
    padding: theme.spacing(2),
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 350,
  },
}));

const StudentDashboard = () => {
  const classes  = useStyles();

  return (
    <div id="student-dashboard">
      <NavBar />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2} style={{ margin: '0 auto' }}>
            <Grid item className={classes.paper1}>
              <Categories />
            </Grid>

            <Grid item className={classes.paper2}>
              <StudentHistory />
            </Grid>

            <Grid item className={classes.paper3}>
              <Leaderboard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentDashboard;
