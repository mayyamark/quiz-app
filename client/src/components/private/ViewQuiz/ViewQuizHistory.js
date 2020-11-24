import moment from 'moment';
import { Alert } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';
import NavBar from '../../common/NavBar/NavBar';
import CustomTable from '../../common/CustomTable/CustomTable';
import './ViewQuizHistory.css';

const ViewQuizHistory = (props) => {
  const quizHistory = props.quizHistory.history;

  return (
    <>
      <NavBar />
      {quizHistory && quizHistory.length > 0 ? (
        <div id="quiz-history-container">
          <h1>QUIZ HISTORY</h1>
          <CustomTable
            customIdName="quiz-history-table"
            tableHead={['No', '', 'Username', 'Names', 'Time taken', 'Score']}
            tableBody={quizHistory.map((history, index) => {
              return {
                id: <>{index + 1}</>,
                avatar: <Avatar src={history.avatar} alt="avatar" />,
                username: <>{history.username}</>,
                names: <>{`${history.firstName} ${history.lastName}`}</>,
                time: (
                  <>
                    {moment(new Date(history.started)).format(
                      'MMM Do YYYY, h:mm:ss a',
                    )}
                  </>
                ),
                score: <>{history.score}</>,
              };
            })}
          />
        </div>
      ) : (
        <Alert severity="warning">There is no quiz history data!</Alert>
      )}
    </>
  );
};

export default ViewQuizHistory;
