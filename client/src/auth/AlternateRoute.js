import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext.js';

const AlternateRoute = ({ componentA: ComponentA, componentB: ComponentB, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ?
          (user.role === 'teacher') ?
            <ComponentA {...props} />
            :
            <ComponentB {...props} />
        :
        <Redirect to="/home" />
      }
    />
  );
};

export default AlternateRoute;
