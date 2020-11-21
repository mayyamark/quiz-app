import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { createCategory, getQuizzes } from '../../../redux-store/actions/teacherDashboard';
import TeacherDashboardComponent from '../../../components/private/TeacherDashboard/TeacherDashboard';
import {useAuth} from '../../../auth/AuthContext';
import Logout from '../../public/Authentication/Logout';

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

  let quizes = null;
  if (teacherDash.quizzes)
  {
    quizes = teacherDash.quizzes.quizes;
  }
  return (
    <div>
      <Logout />
      <TeacherDashboardComponent
        quizzesLoading={teacherDash.loading}
        quizzes={quizes}
        categoryName={categoryName}
        categories={categories}
        handleCategoryNameChange={handleCategoryNameChange}
        handleCreateCategory={handleCreateCategory} />
    </div>
  );
};

export default connect(mapStateToProps)(TeacherDashboard);