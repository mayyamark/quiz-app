import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Register from '../../containers/public/Register';

const PublicApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={LandingPage} />
      <Route path="/register" component={Register} />
      <Route path="*">
        <Redirect to="/home" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default PublicApp;
