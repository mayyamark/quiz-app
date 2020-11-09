import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import StudentDashboard from './StudentDashboard/StudentDashboard';

const PrivateApp = () => (
  <BrowserRouter>
    <div>
      <Link to="/">Dashboard</Link>
    </div>
    <Switch>
      <Route path="/dashboard" component={StudentDashboard} />
      <Route path="*">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default PrivateApp;
