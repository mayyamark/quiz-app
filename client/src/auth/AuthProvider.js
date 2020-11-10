import React, { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { AuthContext } from './AuthContext.js';
import { getToken, removeToken } from '../common/manage-token.js';

const AuthProvider = (props) => {
  const token = getToken();
  
  const [user, setUser] = useState(token ?
    decode(token)
    : null);
    
    useEffect(() => {
      if (user) {
        setTimeout(() => {
          removeToken();
          setUser(null);
        }, user.exp * 1000 - Date.now());
      }
      return () => clearTimeout();
    }, [user]);


    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {props.children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;
