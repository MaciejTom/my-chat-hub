import { useContext } from 'react';
import { AuthContext, AuthContextData } from '../contexts/authContext';

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
