import Categories from '../../../containers/private/Categories/Categories';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import TeacherCreatedQuizes from './TeacherCreatedQuizes';
import './TeacherDashboard.css';

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
    <div id="teacher-dashboard-container">
      <div>
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
          className={classes.selectEmpty}
        >
          Create newcategory
        </Button>
      </div>
      </div>
      <div>
        <TeacherCreatedQuizes
          loading={props.quizzesLoading}
          quizzes={props.quizzes}
        />
        {props.categories.length === 0 ? (
          <Alert severity="warning">
            You need to create a category first to be able to create a quiz
          </Alert>
        ) : (
          <Link id="create-quiz-btn" to="/create-a-quiz">Create new quiz</Link>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
