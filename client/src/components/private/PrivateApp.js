import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import CreateQuiz from '../../containers/private/CreateQuiz/CreateQuiz';
import { useEffect } from 'react';
import StudentRoute from '../../auth/StudentRoute';
import TeacherDashboard from '../../containers/private/TeacherDashboard/TeacherDashboard';
import ViewQuiz from '../../containers/private/ViewQuiz/ViewQuiz';
import ViewQuizHistory from '../../containers/private/ViewQuiz/ViewQuizHistory';
import AlternateRoute from '../../auth/AlternateRoute';
import TeacherRoute from '../../auth/TeacherRoute';
import Quizzes from '../../containers/private/Quizzes/Quizzes';
import LeaderboardPage from '../../containers/private/LeaderboardPage/LeaderboardPage';
import StudentHistoryPage from '../../containers/private/StudentHistoryPage/StudentHistoryPage';
import SolvePage from '../../containers/private/SolvePage/SolvePage';

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
    <Route path="/solvingQuiz/:id" component={SolvePage} />
    <TeacherRoute exact path="/viewQuiz" component={ViewQuiz} />
    <TeacherRoute path="/viewQuiz/:id/history" component={ViewQuizHistory} />
    <AlternateRoute exact path="/dashboard" componentA={TeacherDashboard} componentB={StudentDashboard} />
    <TeacherRoute path="/createQuiz" component={CreateQuiz} />
    <Route path="/quizzes" component={Quizzes} />
    <StudentRoute exact path="/leaderboard" component={LeaderboardPage} />
    <StudentRoute exact path="/history" component={StudentHistoryPage} />
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
    </Switch>
  </BrowserRouter>);
};

export default PrivateApp;
