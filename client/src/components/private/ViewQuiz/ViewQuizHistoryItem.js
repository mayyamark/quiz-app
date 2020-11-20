import { TextField, ListItem } from '@material-ui/core';

const ViewQuizHistoryItem = (props) => {
  const { historyItem } = props;
  return (
    <ListItem>
      <TextField label="Studen name" InputProps={{readOnly: true}} value={`${historyItem.firstName} ${historyItem.lastName}`}/>
      <TextField label="Points" InputProps={{readOnly: true}} value={`${historyItem.score}`} type="number"/>
      <TextField label="Time taken" InputProps={{readOnly: true}} value={`${historyItem.started}`} type="number"/>
    </ListItem>
  );
};

export default ViewQuizHistoryItem;