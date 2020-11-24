import {
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import './CreateQuestion.css';

const CreateQuestion = (props) => {
  let dummyKey = 0;

  return (
    <div id="create-question-container">
      <ListItem className="question-list-item">
        <TextField
          label="Question"
          value={`${props.question.text}`}
          onChange={props.handleQuestionTextChange(props.question)}
        />
        <TextField
          label="Points"
          value={`${props.question.points}`}
          type="number"
          InputProps={{ inputProps: { min: 1, max: 10 } }}
          onChange={props.handlePointsChange(props.question)}
        />
        {props.question.answers && (
          <List component="nav" aria-label="answers">
            {props.question.answers.map((answer) => (
              <ListItem key={dummyKey++}>
                <TextField
                  className="answer-input"
                  label="Answer"
                  value={`${answer.text}`}
                  onChange={props.handleAnswerChange(answer)}
                />
                <ListItemSecondaryAction>
                <FormHelperText>True?</FormHelperText>
                  <Checkbox
                    edge="end"
                    onChange={props.handleSetAnswerTrue(answer)}
                    checked={answer.isTrue}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        <div id="create-question-btns">
        <Button
          id="outlined-basic"
          variant="outlined"
          color="primary"
          onClick={props.handleAddAnswer(props.question)}
        >
          Add an answer
        </Button>
        <Button
          id="outlined-basic"
          color="secondary"
          variant="outlined"
          onClick={props.handleDeleteQuestion(props.question)}
        >
          Delete question
        </Button>
        </div>
      </ListItem>
    </div>
  );
};

export default CreateQuestion;
