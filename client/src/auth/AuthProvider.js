import React, { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import decode from 'jwt-decode';

const AuthProvider = (props) => {
  const token = localStorage.getItem('token');

  const [user, setUser] = useState(token ?
    decode(token)
    : null);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
