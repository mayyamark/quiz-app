import AuthProvider from './auth/AuthProvider';
import { useAuth } from './auth/AuthContext';
import PublicApp from './components/public/PublicApp';
import './App.css';

const App = () => {
  const { user } = useAuth();

  return (
    <AuthProvider>
      {user ? <PrivateApp /> : <PublicApp />}
    </AuthProvider>
  );
};

export default App;
