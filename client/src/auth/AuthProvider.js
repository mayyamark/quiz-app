import React, { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import decode from 'jwt-decode';
import { getToken, removeToken } from '../common/manage-token.js';

const AuthProvider = (props) => {
  const token = getToken();

  const [user, setUser] = useState(token ?
    decode(token)
    : null);
    
    // TODO: After setting user to null, redirect to Landing page
    if (user) {
      setTimeout(() => {
        removeToken();
        setUser(null);
      }, user.exp * 1000 - Date.now());
    }

    return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
