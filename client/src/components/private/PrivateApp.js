import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import StudentDashboard from './StudentDashboard/StudentDashboard';

const PrivateApp = () => (
  <BrowserRouter>
    <Switch>
    <Route path="/dashboard" component={StudentDashboard} />
      <Route path="*">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default PrivateApp;
