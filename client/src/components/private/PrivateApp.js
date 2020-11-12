import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import { useEffect } from 'react';
import StudentRoute from '../../auth/StudentRoute';
import LeaderboardPage from '../../containers/private/LeaderboardPage/LeaderboardPage';

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
    <StudentRoute exact path="/dashboard" component={StudentDashboard} />
    <StudentRoute exact path="/leaderboard" component={LeaderboardPage} />
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
    </Switch>
  </BrowserRouter>);
};

export default PrivateApp;
