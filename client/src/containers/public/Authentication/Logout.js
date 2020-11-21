import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BASE_URL from '../../../common/base-url.js';
import { getToken, removeToken } from '../../../common/manage-token.js';
import { useAuth } from '../../../auth/AuthContext';
import PublicApp from '../../../components/public/PublicApp.js';
import StudentDashboard from '../../../components/private/StudentDashboard/StudentDashboard';
import { showInfoAlert } from '../../../components/common/Alerts/Alerts';

const Logout = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    fetch(`${BASE_URL}/auth/session`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
          removeToken();
          setUser(null);
          setFetchSuccess(true);

          showInfoAlert('Bye!', 'See you soon!', 'success', 'OK');
      })
      .catch((err) => {
        showInfoAlert('Attention!', 'An error has occurred!', 'error', 'OK :(');

        setError(true);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    setError(false);
    return <StudentDashboard />;
  }
  if (fetchSuccess) {
    return <PublicApp />;
  }

  return <Button variant="contained" onClick={handleLogout} color="primary">LOG OUT</Button>;
};

export default Logout;