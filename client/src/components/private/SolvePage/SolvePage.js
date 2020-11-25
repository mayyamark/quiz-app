import { memo, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ErrorPage from '../../common/ErrorPage/ErrorPage';
import './SolvePage.css';

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
      const finishTime = moment(new Date())
        .add(solvingInfo.quiz.time, 'm')
        .toDate();

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

    onFinishSolving(
      id,
      { id, questionAnswers: mappedQuestionAnswers },
      history,
    );
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
      {error ? (
        <ErrorPage />
      ) : loading ? (
        <CircularProgress />
      ) : hasQuiz ? (
        <div id="solve-quiz-container">
          <FormControl>
            <h1>{solvingInfo.quiz.name}</h1>
            <p>
              Category: <b>{solvingInfo.quiz.category}</b>
            </p>
            <p>
              Created by:{' '}
              <b>{`${solvingInfo.quiz.firstName} ${solvingInfo.quiz.lastName}`}</b>
            </p>
            <p>
              Started at:{' '}
              <b>{moment(new Date(solvingInfo.startTime)).format('lll')}</b>
            </p>
            <div id="timer">
              <AccessTimeIcon />
              <p>{`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`}</p>
            </div>
            {solvingInfo.quiz.questions.map((question, index) => {
              return (
                <div
                  className="question-container"
                  value={question.id}
                  key={question.id}
                >
                  <div className="question-text-container">
                    <p>{`${index + 1}.`} </p>
                    <p className="question-text">{question.text}</p>
                  </div>
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
            <Button
              id="solve-btn"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              I'M READY
            </Button>
          </FormControl>
        </div>
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
