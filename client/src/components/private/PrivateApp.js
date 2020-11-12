import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import Leaderboard from '../../containers/private/Leaderboard/Leaderboard';
import { useEffect } from 'react';
import StudentRoute from '../../auth/StudentRoute';

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
    <StudentRoute path="/leaderboard" component={Leaderboard} />
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
    </Switch>
  </BrowserRouter>);
};

export default PrivateApp;
