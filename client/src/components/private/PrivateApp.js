import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import { useEffect } from 'react';
import StudentRoute from '../../auth/StudentRoute';
import TeacherRoute from '../../auth/TeacherRoute';

const PrivateApp = () => {
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);

  return (
  <BrowserRouter>
    <Switch>
    <StudentRoute path="/dashboard" component={StudentDashboard} />
    <TeacherRoute path="/create-a-quiz" component={CreateQuiz} />
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
    </Switch>
  </BrowserRouter>);
};

export default PrivateApp;
