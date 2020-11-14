import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem } from '@material-ui/core';
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
        category: categoriesState.categories.filter(category => category.id === category)[0].name,
        questions: [{
                text: 'Which are periodic elements',
                points: 2,
                answers: [{
                        text: 'H',
                        isTrue: true,
                    },
                    {
                        text: 'C',
                        isTrue: true,
                    },
                ],
            },
            {
                text: 'Which elements are metals',
                points: 4,
                answers: [{
                        text: 'O',
                        isTrue: false,
                    },
                    {
                        text: 'Hg',
                        isTrue: true,
                    },
                ],
            },
        ],
    };
  };

  const [name, setName] = useState();
  const [timeLimit, setTimeLimit] = useState();
  const [category, setCategory] = useState(0);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

  return ((categoriesState.categories && categoriesState.categories.length > 0) ?
    <form className={classes.root} noValidate autoComplete="off">
      {quizesState.error}
      <div>
        <TextField id="outlined-basic" label="Quiz Name" variant="outlined" onChange={handleNameChange}/>
        <TextField id="outlined-basic" label="Time Limit" type="number" InputProps={{ inputProps: { min: 1, max: 60 } }} variant="outlined" onChange={handleTimeLimitChange}/>
      </div>
      <div>
        <Select id="outlined-basic" label="Category" variant="outlined" value={category.id} onChange={handleCategoryChange} className={classes.selectEmpty}>
          {categoriesState.categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
        </Select>
      </div>
      <div>
        <form noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Question" variant="outlined" onChange={handleNameChange}/>
          <TextField id="outlined-basic" label="Points" type="number" InputProps={{ inputProps: { min: 1, max: 60 } }} variant="outlined" onChange={handleTimeLimitChange}/>
        </form>
      </div>
      <Button onClick={createAQuiz}>Create that quiz!</Button>
    </form>
    :
    <div>
      There are no categories!
    </div>
  );
};
export default connect(mapStateToProps)(CreateQuiz);