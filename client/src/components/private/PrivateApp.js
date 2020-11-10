import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import Login from '../../containers/public/Authentication/Login';
import StudentDashboard from './StudentDashboard/StudentDashboard';

const PrivateApp = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  } 

  return (
  <BrowserRouter>
    <Switch>
    <Route path="/dashboard" component={StudentDashboard} />
      <Route path="*">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  </BrowserRouter>);
};

export default PrivateApp;
