import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { initCategories } from '../../../redux-store/actions/Categories';
import { createQuiz } from '../../../redux-store/actions/Quizzes';
import CreateQuizComponent from '../../../components/private/CreateQuiz/CreateQuiz';
import { Alert } from '@material-ui/lab';

const mapStateToProps = (state) => {
  const props = {
      quizzesState: {
        categories: state.categories.categories,
        error: state.categories.error,
      },
  };
  props.quizzesState.lastCreatedQuiz = state.quizzes.lastCreatedQuiz;

  if (!props.quizzesState.error) {
    props.quizzesState.error = state.quizzes.error;
  }
  return props;
};

const CreateQuiz = (props) => {
  const { quizzesState } = props;
  const dispatch = useDispatch();
  const createAQuiz = () => {
    dispatch(createQuiz(createQuizData()));
  };
  useEffect(() => {
    initCategories()(dispatch);
  }, []);

  const createQuizData = () => {
    return {
        name: name,
        timeLimit: timeLimit,
        category: quizzesState.categories.filter(cat => cat.id === category)[0].name,
        questions: questions,
    };
  };


  const [name, setName] = useState();
  const [timeLimit, setTimeLimit] = useState();
  const [category, setCategory] = useState(1);
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

  return ((quizzesState.categories && quizzesState.categories.length > 0) ?
    <CreateQuizComponent
      category={category}
      quizzesState={quizzesState}
      quizName={name}
      quizTimeLimit={timeLimit}
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
    <Alert severity="warning">There are no categories!</Alert>
  );
};
export default connect(mapStateToProps)(CreateQuiz);