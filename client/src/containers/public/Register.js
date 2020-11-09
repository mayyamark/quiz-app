import React, { useState } from 'react';
import decode from 'jwt-decode';
import swal from 'sweetalert';
import BASE_URL from '../../common/base-url.js';
import { useAuth } from '../../auth/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import RegisterForm from '../../components/public/RegisterForm/RegisterForm';
import PrivateApp from '../../components/private/PrivateApp';

const Register = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const handleRegister = (registerData) => {
    setLoading(true);

    fetch(`${BASE_URL}/auth/registration`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          localStorage.setItem('token', data.token);
          const user = decode(data.token);
          setUser(user);
        }
      })
      .catch((err) => {
        swal({
          title: 'Attention!',
          text: `${err.message}`,
          icon: 'error',
          button: 'OK :(',
        });
      })
      .finally(() => {
        setLoading(false);

        swal({
          title: `Welcome, ${registerData.username}!`,
          text: 'Have fun!',
          icon: 'success',
          button: 'Awesome!',
        });

        setFetchSuccess(true);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (fetchSuccess) {
    return <PrivateApp />;
  }

  return <RegisterForm register={handleRegister} />;
};

export default Register;
