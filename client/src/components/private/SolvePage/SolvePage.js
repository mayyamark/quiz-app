import { memo, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const SolvePage = memo((props) => {
  const {
    solvingInfo,
    loading,
    error,
    onStartSolving,
    onFinishSolving,
    hasQuiz,
  } = props;
  const { id } = useParams();

  const history = useHistory();

  const [questionAnswers, setQuestionAnswers] = useState([]);

  useEffect(() => {
    onStartSolving(id);
  }, [onStartSolving, id]);
  useEffect(() => {
    if (hasQuiz) {
      setQuestionAnswers(
        solvingInfo.quiz.questions.map((question) => {
          return { id: question.id, markedTrue: [] };
        }),
      );
    }
  }, [hasQuiz]);

  const handleSubmit = (ev) => {
    onFinishSolving(id, { id, questionAnswers });
    history.push('/dashboard');
  };

  const handleChange = (ev) => {
    const { value: answerId, checked, name: questionId } = ev.target;

    const questionAnswersCopy = [...questionAnswers];
    const questionObjectIndex = questionAnswers.findIndex(
      (q) => q.id === +questionId,
    );
    const answerIndex = questionAnswersCopy[
      questionObjectIndex
    ].markedTrue.findIndex((a) => a === +answerId);

    if (checked) {
      if (answerIndex === -1) {
        questionAnswersCopy[questionObjectIndex].markedTrue.push(+answerId);
        setQuestionAnswers(questionAnswersCopy);
      }
    } else {
      if (answerIndex !== -1) {
        questionAnswersCopy[questionObjectIndex].markedTrue.splice(
          answerIndex,
          1,
        );
        setQuestionAnswers(questionAnswersCopy);
      }
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : hasQuiz ? (
        <FormControl>
          <h1>{solvingInfo.quiz.name}</h1>
          <p>Started at: {new Date(solvingInfo.startTime).toLocaleString()}</p>
          <p>Solving time: {solvingInfo.quiz.time}</p>
          <p>Category: {solvingInfo.quiz.category}</p>
          <p>
            Created by:{' '}
            {`${solvingInfo.quiz.firstName} ${solvingInfo.quiz.lastName}`}
          </p>
          {solvingInfo.quiz.questions.map((question, index) => {
            return (
              <div value={question.id} key={question.id}>
                <p>{`${index + 1}. ${question.text}`}</p>
                {question.answers.map((answer) => {
                  return (
                    <FormControlLabel
                      key={answer.id}
                      control={
                        <Checkbox
                          onChange={handleChange}
                          question={answer.questionId}
                          value={answer.id}
                          name={answer.questionId.toString()}
                          color="primary"
                        />
                      }
                      label={answer.text}
                    />
                  );
                })}
              </div>
            );
          })}
          <Button onClick={handleSubmit} variant="contained" color="primary">
            SEND
          </Button>
        </FormControl>
      ) : null}
    </>
  );
});

SolvePage.defaultProps = {
  solvingInfo: {},
  error: false,
  loading: false,
  hasQuiz: false,
  onStartSolving: () => {},
  onFinishSolving: () => {},
};

export default SolvePage;
