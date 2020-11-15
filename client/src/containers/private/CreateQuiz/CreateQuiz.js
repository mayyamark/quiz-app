import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import createQuiz from '../../../redux-store/actions/quizes';
import getCategories from '../../../redux-store/actions/categories';

import CreateQuestion from '../../../components/private/CreateQuiz/CreateQuestion';
import CreateQuizComponent from '../../../components/private/CreateQuiz/CreateQuiz';

const mapStateToProps = (state) => {
  return {
      categoriesState: state.categories,
      quizesState: state.quizes,
  };
};


const CreateQuiz = (props) => {

  const { categoriesState, quizesState } = props;
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
  const handleDeleteQuestion = (question) => (event) => {
    setQuestions(questions.filter(q => q != question));
  };
  const handleAddAnswer = (question) => (event) => {
    if (!question.answers) {
      question.answers = [];
    }
    question.answers.push({ text: '', isTrue: false });
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
    <CreateQuizComponent
      category={category}
      quizesState={quizesState}
      categoriesState={categoriesState}
      handleCategoryChange={handleCategoryChange}
      handleQuizNameChange={handleQuizNameChange}
      handleTimeLimitChange={handleTimeLimitChange}
      handleAddQuestion={handleAddQuestion}
      questions={questions}
      handleQuestionTextChange={handleQuestionTextChange}
      handlePointsChange={handlePointsChange}
      handleAnswerChange={handleAnswerChange}
      handleAddAnswer={handleAddAnswer}
      handleDeleteQuestion={handleDeleteQuestion}
      handleSetAnswerTrue={handleSetAnswerTrue}
      createAQuiz={createAQuiz}/>
    :
    <div>
      There are no categories!
    </div>
  );
};
export default connect(mapStateToProps)(CreateQuiz);