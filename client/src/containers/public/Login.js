import React, { useState } from 'react';
import decode from 'jwt-decode';
import swal from 'sweetalert';
import BASE_URL from '../../common/base-url.js';
import { useAuth } from '../../auth/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoginForm from '../../components/public/LoginForm/LoginForm';
import PrivateApp from '../../components/private/PrivateApp';

const Login = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  
  const handleLogin = (loginData) => {
    setLoading(true);

    fetch(`${BASE_URL}/auth/session`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          localStorage.setItem('token', data.token);
          const user = decode(data.token);
          
          setUser(user);
          setFetchSuccess(true);

          swal({
            title: `Welcome back, ${loginData.username}!`,
            text: 'Have fun!',
            icon: 'success',
            button: 'Nice!',
          });
        }
      })
      .catch((err) => {
        swal({
          title: 'Attention!',
          text: `${err.message}`,
          icon: 'error',
          button: 'OK :(',
        });

        setError(true);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    setError(false);
    return <LoginForm login={handleLogin} />;
  }
  if (fetchSuccess) {
    return <PrivateApp />;
  }

  return <LoginForm login={handleLogin} />;
};

export default Login;

