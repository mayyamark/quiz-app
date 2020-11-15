import { memo, useEffect } from 'react';
import CustomTable from '../../CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import './StudentHistory.css';
import { useAuth } from '../../../auth/AuthContext';

const StudentHistory = memo((props) => {
  const { studentHistory, loading, error, onInitStudentHistory, hasStudentHistory } = props;
  const { user } = useAuth();

  useEffect(() => {
    onInitStudentHistory(user.sub);
  }, [onInitStudentHistory, user.sub]);

  return (
    <>
      {loading ?
        <CircularProgress /> :
        hasStudentHistory ?
          <div id="student-dashboard-history-container" >
            <h1>My History</h1>
            <CustomTable
              customIdName="student-dashboard-history-table"
              tableHead={['No', 'Quiz', 'Time, min', 'Score']}
              tableBody={studentHistory.history.map((history, index) => {
                return {
                  id: <>{index + 1}</>,
                  quiz: <>{history.name}</>,
                  time: <>{(new Date(history.finished) - new Date(history.started))/60000}</>,
                  score: <>{history.score}</>,
                };
              })}
            />
          </div>
        : null
      }
    </>
  );

});

StudentHistory.defaultProps = {
  studentHistory: {},
  error: false,
  loading: false,
  hasStudentHistory: false,
  onInitStudentHistory: () => {},
};

export default StudentHistory;