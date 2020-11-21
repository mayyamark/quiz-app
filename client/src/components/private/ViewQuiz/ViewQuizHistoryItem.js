import { TextField, ListItem } from '@material-ui/core';

const ViewQuizHistoryItem = (props) => {
  const { historyItem } = props;
  return (
    <ListItem  key={historyItem.username}>
      <TextField label="Studen name" InputProps={{readOnly: true}} value={`${historyItem.firstName} ${historyItem.lastName}`}/>
      <TextField label="Points" InputProps={{readOnly: true}} value={`${historyItem.score}`} type="number"/>
      <TextField label="Time taken" InputProps={{readOnly: true}} value={`${historyItem.started.substring(0, historyItem.started.length - 1)}`} type="datetime-local"/>
    </ListItem>
  );
};

export default ViewQuizHistoryItem;