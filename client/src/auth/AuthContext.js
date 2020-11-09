import React from 'react';

const AuthContext = React.createContext({
    user: null,
    setUser: () => {},
});

const useAuth = () => React.useContext(AuthContext);

export {
  AuthContext,
  useAuth,
};
