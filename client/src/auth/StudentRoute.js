import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext.js';

const StudentRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        (user && user.role === 'student') ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

export default StudentRoute;
