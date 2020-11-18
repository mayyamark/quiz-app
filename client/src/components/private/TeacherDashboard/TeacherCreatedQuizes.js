import CustomTable from '../../CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const TeacherCreatedQuizes = props => {
  const { quizzes, loading } = props;
    return (
      <>
        {loading ?
          <CircularProgress />
          :
          quizzes && quizzes.length > 0 ?
            <div id="student-dashboard-categories-container" >
              <h1>Quizzes</h1>
              <CustomTable
                customIdName="student-dashboard-categories-table"
                tableHead={['Quiz', 'Category']}
                tableBody={quizzes.map((quiz) => {
                  return {
                    quiz: <Link to ={`/view-quiz?id=${quiz.id}`}>{quiz.name}</Link>,
                    id: <>{quiz.category}</>,
                  };
                })}
              />
            </div>
          :
          <div>
            There are no quizzes.
          </div>
        }
      </>
    );

};

export default TeacherCreatedQuizes;