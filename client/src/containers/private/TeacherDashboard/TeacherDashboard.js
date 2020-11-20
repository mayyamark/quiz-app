import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { createCategory, getQuizzes } from '../../../redux-store/actions/teacherDashboard';
import TeacherDashboardComponent from '../../../components/private/TeacherDashboard/TeacherDashboard';
import {useAuth} from '../../../auth/AuthContext';
import Logout from '../../public/Authentication/Logout';

const mapStateToProps = (state) => {
  return {
      teacherDash: state.teacherDash,
  };
};

const TeacherDashboard = (props) => {
  const {teacherDash} = props;
  const [categoryName, setcategoryName] = useState();
  const dispatch = useDispatch();
  const auth = useAuth();
  useEffect(() => {
    dispatch(getQuizzes(auth.user.username));
  }, []);

  const handleCategoryNameChange = (event) => {
    setcategoryName(event.target.value);
  };

  const handleCreateCategory = (event) => {
    dispatch(createCategory(categoryName));
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
        handleCategoryNameChange={handleCategoryNameChange}
        handleCreateCategory={handleCreateCategory} />
    </div>
  );
};

export default connect(mapStateToProps)(TeacherDashboard);