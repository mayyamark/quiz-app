import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import { useEffect } from 'react';
import StudentRoute from '../../auth/StudentRoute';
import Quizes from '../../containers/private/Quizes/Quizes';
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
    <Route path="/quizzes" component={Quizes} />
    <Route path="/solvingQuiz/:id" component={SolvePage} />
    <StudentRoute exact path="/dashboard" component={StudentDashboard} />
    <StudentRoute exact path="/leaderboard" component={LeaderboardPage} />
    <StudentRoute exact path="/history" component={StudentHistoryPage} />
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
    </Switch>
  </BrowserRouter>);
};

export default PrivateApp;
