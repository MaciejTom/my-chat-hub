import { useContext } from 'react';
import { RegisterContext, RegisterContextData } from '../contexts/registerContext';

const useAuth = (): RegisterContextData => {
  const context = useContext(RegisterContext);
  return context;
};

export default useAuth;
