import { TextField, Button, List, ListItem, Checkbox, ListItemSecondaryAction } from '@material-ui/core';

const CreateQuestion = (props) => {
  return (
    <ListItem>
      <TextField label="Question" value={`${props.question.text}`} onChange={props.handleQuestionTextChange(props.question)}/>
      <TextField label="Points" value={`${props.question.points}`} type="number" InputProps={{ inputProps: { min: 1, max: 60 } }} onChange={props.handlePointsChange(props.question)}/>
      {props.question.answers &&
      <List component="nav"aria-label="answers">
      {props.question.answers.map(answer =>
        <ListItem>
          <TextField label="Answer" value={`${answer.text}`} onChange={props.handleAnswerChange(answer)}/>
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={props.handleSetAnswerTrue(answer)}
            checked={answer.isTrue}
          />
        </ListItemSecondaryAction>
        </ListItem>)

      }
      </List>
      }
      <Button id="outlined-basic" variant="outlined" onClick={props.handleAddAnswer(props.question)}>Add answer</Button>
      <Button id="outlined-basic" variant="outlined" onClick={props.handleDeleteQuestion(props.question)}>Delete</Button>
    </ListItem>
  );
};

export default CreateQuestion;