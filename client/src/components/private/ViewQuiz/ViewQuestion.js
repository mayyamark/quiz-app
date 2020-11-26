import {
  TextField,
  List,
  ListItem,
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import './ViewQuestion.css';

const ViewQuestion = (props) => {
  return (
    <div id="view-question-container">
      <ListItem className="view-question-list-item">
        <TextField
          label={`Question ${props.num}`}
          InputProps={{ readOnly: true }}
          value={`${props.question.text}`}
        />
        <TextField
          label="Points"
          InputProps={{ readOnly: true }}
          value={`${props.question.points}`}
          type="number"
        />
        {props.question.answers && (
          <List component="nav" aria-label="answers">
            {props.question.answers.map((answer, index) => (
              <ListItem key={answer.id}>
                <TextField
                  label={`Answer ${index + 1}`}
                  className="answer-input"
                  InputProps={{ readOnly: true }}
                  value={`${answer.text}`}
                />
                <ListItemSecondaryAction>
                <FormHelperText>True?</FormHelperText>
                  <Checkbox
                    edge="end"
                    inputProps={{ readOnly: true }}
                    checked={!!answer.isTrue}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </ListItem>
    </div>
  );
};

export default ViewQuestion;
