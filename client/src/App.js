import { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { AuthContext } from './auth/AuthContext.js';
import { getToken, removeToken } from './common/manage-token.js';
import PublicApp from './components/public/PublicApp';
import PrivateApp from './components/private/PrivateApp';
import './App.css';

const App = () => {
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
        {user ? <PrivateApp /> : <PublicApp />}
      </AuthContext.Provider>
  );
};

export default App;
