import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import { useEffect } from 'react';
import StudentRoute from '../../auth/StudentRoute';
import TeacherDashboard from '../../containers/private/TeacherDashboard/TeacherDashboard';
import ViewQuiz from '../../containers/private/ViewQuiz/ViewQuiz';
import AlternateRoute from '../../auth/AlternateRoute';
import Quizes from '../../containers/private/Quizes/Quizes';
import LeaderboardPage from '../../containers/private/LeaderboardPage/LeaderboardPage';
import StudentHistoryPage from '../../containers/private/StudentHistoryPage/StudentHistoryPage';

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
    <Route path="/view-quiz" component={ViewQuiz} />
    <AlternateRoute exact path="/dashboard" componentA={TeacherDashboard} componentB={StudentDashboard} />
    <Route path="/quizzes" component={Quizes} />
    <StudentRoute exact path="/leaderboard" component={LeaderboardPage} />
    <StudentRoute exact path="/history" component={StudentHistoryPage} />
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
    </Switch>
  </BrowserRouter>);
};

export default PrivateApp;
