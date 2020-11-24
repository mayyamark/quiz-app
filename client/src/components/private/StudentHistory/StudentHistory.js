import { memo, useEffect } from 'react';
import moment from 'moment';
import CustomTable from '../../common/CustomTable/CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../../auth/AuthContext';
import './StudentHistory.css';

const StudentHistory = memo((props) => {
  const {
    studentHistory,
    loading,
    onInitStudentHistory,
    hasStudentHistory,
  } = props;
  const { user } = useAuth();

  useEffect(() => {
    onInitStudentHistory(user.sub);
  }, [onInitStudentHistory, user.sub]);

  return (
    <>
      { loading ? (
        <CircularProgress />
      ) : hasStudentHistory ? (
        <div id="student-dashboard-history-container">
          <h1>My History</h1>
          <CustomTable
            customIdName="student-dashboard-history-table"
            tableHead={['No', 'Quiz', 'Solve date', 'Score']}
            tableBody={studentHistory.history.map((history, index) => {
              return {
                id: <>{index + 1}</>,
                quiz: <>{history.name}</>,
                date: <>{moment(new Date(history.started)).calendar()}</>,
                score: <>{history.score}</>,
              };
            })}
          />
        </div>
      ) : null}
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
