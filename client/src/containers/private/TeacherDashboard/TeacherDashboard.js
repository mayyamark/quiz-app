import { useState, useEffect } from 'react';
import { connect , useDispatch } from 'react-redux';
import { createCategory, getQuizzes } from '../../../redux-store/actions/teacherDashboard';
import TeacherDashboardComponent from '../../../components/private/TeacherDashboard/TeacherDashboard';
import {useAuth} from '../../../auth/AuthContext';

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

    <TeacherDashboardComponent
      quizzesLoading={teacherDash.loading}
      quizzes={quizes}
      handleCategoryNameChange={handleCategoryNameChange}
      handleCreateCategory={handleCreateCategory} />
  );
};

export default connect(mapStateToProps)(TeacherDashboard);