import { memo, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
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
  const [duration, setDuration] = useState({});

  useEffect(() => {
    onStartSolving(id);
  }, [onStartSolving, id]);

  useEffect(() => {
    if (hasQuiz) {
      const currentTime = new Date();
      const finishTime = moment(new Date()).add(solvingInfo.quiz.time, 'm').toDate();

      setDuration(moment.duration(finishTime - currentTime, 'milliseconds'));

      setQuestionAnswers(
        solvingInfo.quiz.questions.map((question) => {
          return { id: question.id, markedTrue: [] };
        }),
      );
    }
  }, [hasQuiz]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDuration(moment.duration(duration - 1000, 'milliseconds'));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (duration._milliseconds === 0) {
      handleSubmit();
    }
  }, [duration]);

  const handleSubmit = () => {
    const mappedQuestionAnswers = questionAnswers.map((q) => {
      if (q.markedTrue.length === 0) {
        q.markedTrue.push(0);
      }
      return q;
    });

    onFinishSolving(id, { id, questionAnswers: mappedQuestionAnswers });
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
      {
      // TODO: Add an error component with link to dashboard
      error ? <h1>Error! Please, go back!</h1> :
      (loading ? (
        <CircularProgress />
      ) : hasQuiz ? (
        <FormControl>
          <h1>{solvingInfo.quiz.name}</h1>
          <p>Started at: {moment(new Date(solvingInfo.startTime)).format('lll')}</p>
          <p>Time left: {`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`}</p>
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
      ) : null)}
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
