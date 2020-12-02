import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { createCategory, getQuizzes } from '../../../redux-store/actions/teacherDashboard';
import TeacherDashboardComponent from '../../../components/private/TeacherDashboard/TeacherDashboard';
import NavBar from '../../../components/common/NavBar/NavBar';
import { useAuth } from '../../../auth/AuthContext';
import { Alert } from '@material-ui/lab';

const mapStateToProps = (state) => {
  return {
      teacherDash: state.teacherDash,
      categories: state.categories.categories,
  };
};

const TeacherDashboard = (props) => {
  const { teacherDash, categories } = props;
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();
  const auth = useAuth();
  useEffect(() => {
    dispatch(getQuizzes(auth.user.username));
  }, []);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCreateCategory = (event) => {
    dispatch(createCategory(categoryName));
    setCategoryName('');
  };

  let quizzes = null;
  if (teacherDash.quizzes)
  {
    quizzes = teacherDash.quizzes.quizzes;
  }
  return (
    <div>
      <NavBar />
      <TeacherDashboardComponent
        quizzesLoading={teacherDash.loading}
        quizzes={quizzes}
        categoryName={categoryName}
        categories={categories}
        handleCategoryNameChange={handleCategoryNameChange}
        handleCreateCategory={handleCreateCategory} />
    </div>
  );
};

export default connect(mapStateToProps)(TeacherDashboard);