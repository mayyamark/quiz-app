import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { initCategories } from '../../../redux-store/actions/Categories';
import { createQuiz, clearLastCreatedQuiz } from '../../../redux-store/actions/Quizes';
import CreateQuizComponent from '../../../components/private/CreateQuiz/CreateQuiz';

const mapStateToProps = (state) => {
  const props = {
      quizesState: {
        categories: state.categories.categories,
        error: state.categories.error,
      },
  };
  props.quizesState.lastCreatedQuiz = state.quizes.lastCreatedQuiz;

  if (!props.quizesState.error) {
    props.quizesState.error = state.quizes.error;
  }
  return props;
};

const CreateQuiz = (props) => {
  const { quizesState } = props;
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
        category: quizesState.categories.filter(cat => cat.id === category)[0].name,
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

  if (quizesState.lastCreatedQuiz){
    // TODO: navigate to view quiz page from here instead of alerting and clearing with null
    dispatch(clearLastCreatedQuiz);
    alert(`Successfully created quiz ${quizesState.lastCreatedQuiz.name} with id ${quizesState.lastCreatedQuiz.id}`);
    quizesState.lastCreatedQuiz = null;
  }

  return ((quizesState.categories && quizesState.categories.length > 0) ?
    <CreateQuizComponent
      category={category}
      quizesState={quizesState}
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