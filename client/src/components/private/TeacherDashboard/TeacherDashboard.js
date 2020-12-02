import Categories from '../../../containers/private/Categories/Categories';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import TeacherCreatedQuizzes from './TeacherCreatedQuizzes';
import './TeacherDashboard.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper1: {
    padding: theme.spacing(5),
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 380,
  },
  paper2: {
    padding: theme.spacing(5),
    alignContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 600,
  },
}));

const TeacherDashboard = (props) => {
  const classes = useStyles();

  return (
      <Grid container className={classes.root} spacing={10}>
        <Grid item xs={12}>
          <Grid container
          justify="center"
          spacing={10}
          style={{ margin: '0 auto' }}
          >
            <Grid item className={classes.paper1}>
                <Categories />
                <div id="create-cat">
                <TextField

                  id="outlined-basic"
                  label="Category name"
                  variant="outlined"
                  value={props.categoryName}
                  onChange={props.handleCategoryNameChange}
                />
                <Button
                  id="outlined-basic"
                  variant="outlined"
                  onClick={props.handleCreateCategory}
                  disabled={!props.categoryName}
                >
                  Create new category
                </Button>
                </div>
              </Grid>

              <Grid item className={classes.paper2}>
                <TeacherCreatedQuizzes
                  loading={props.quizzesLoading}
                  quizzes={props.quizzes}
                />
                {props.categories.length === 0 ? (
                  <Alert severity="warning">
                    You need to create a category first to be able to create a
                    quiz
                  </Alert>
                ) : (
                  <Link id="create-quiz-btn" to="/createQuiz">
                    Create new quiz
                  </Link>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default TeacherDashboard;
