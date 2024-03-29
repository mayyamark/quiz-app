import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Register from '../../containers/public/Authentication/Register';
import Login from '../../containers/public/Authentication/Login';

const PublicApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default PublicApp;
