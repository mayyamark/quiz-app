import CustomTable from '../../common/CustomTable/CustomTable';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import './TeacherCreatedQuizes.css';

const TeacherCreatedQuizes = props => {
  const { quizzes, loading } = props;

  return (
    <>
      {loading ?
        <CircularProgress />
        :
        quizzes && quizzes.length > 0 ?
          <div id="teacher-quizzes-container" >
            <h1>My Last Quizzes</h1>
            <CustomTable
              customIdName="teacher-quizzes-table"
              tableHead={['No', 'Category', 'Quiz', 'Solve Time']}
              tableBody={quizzes.map((quiz, index) => {
                return {
                  id: <>{index + 1}</>,
                  category: <>{quiz.category}</>,
                  quiz: <Link to ={`/view-quiz?id=${quiz.id}`}>{quiz.name}</Link>,
                  time: <>{quiz.time}</>,
                };
              })}
            />
          </div>
        :
        <Alert severity="warning">
          There are no quizzes.
        </Alert>
      }
    </>
  );

};

export default TeacherCreatedQuizes;