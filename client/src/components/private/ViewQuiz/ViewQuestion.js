import { TextField, Button, List, ListItem, Checkbox, ListItemSecondaryAction } from '@material-ui/core';

const ViewQuestion = (props) => {
  return (
    <ListItem>
      <TextField label="Question" InputProps={{readOnly: true}} value={`${props.question.text}`}/>
      <TextField label="Points" InputProps={{readOnly: true}} value={`${props.question.points}`} type="number"/>
      {props.question.answers &&
      <List component="nav"aria-label="answers">
      {props.question.answers.map(answer =>
        <ListItem key={answer.id}>
          <TextField label="Answer" InputProps={{readOnly: true}} value={`${answer.text}`}/>
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            InputProps={{readOnly: true}}
            checked={!!answer.isTrue}
          />
        </ListItemSecondaryAction>
        </ListItem>)

      }
      </List>
      }
    </ListItem>
  );
};

export default ViewQuestion;