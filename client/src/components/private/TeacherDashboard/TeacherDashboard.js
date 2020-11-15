import Categories from '../../../containers/private/Categories/Categories';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, Grid, TextField } from '@material-ui/core';
import Quizzes from '../Quizzes/Quizzes';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const TeacherDashboard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} container direction="column" justify="center" alignItems="stretch">
          <Paper className={classes.paper}>
            <Quizzes loading = {props.quizzesLoading} quizzes = {props.quizzes} />
            <Link to='/create-a-quiz'>Create a quiz</Link>
          </Paper>
        </Grid>
        <Grid spacing={3} item xs={6} container direction="column" justify="center" alignItems="stretch">
           <Categories />
            <TextField id="outlined-basic" label="Category name" variant="outlined" onChange={props.handleCategoryNameChange}/>
            <Button id="outlined-basic" variant="outlined" onClick={props.handleCreateCategory} className={classes.selectEmpty}>Create category</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherDashboard;