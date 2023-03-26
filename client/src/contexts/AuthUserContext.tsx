import { createContext, useEffect, useState } from 'react'; 
import { authUser } from "../api/authApi";

export interface AuthUserContextInterface {
  user: null | string,
  isLoading: boolean,
  setUser: (user: string | null) => void,
  id: null | number,
  setId: (id: null | number) => void
}

//set initial value of user to null (pre-login)
export const AuthUserContext = createContext({} as AuthUserContextInterface);

export function AuthUserProvider(props: React.PropsWithChildren<any>) {
  const [user, setUser] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id, setId] = useState<null | number>(null);

  useEffect(() => {
    const authData = async () => {
      setIsLoading(true);
      const res = await authUser();
      setId(res.userId);
      setUser(res.username);
      setIsLoading(false);
    };
    authData();
  }, []);
  

  return (
    <AuthUserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        id,
        setId
      }}
    >
      {props.children}
    </AuthUserContext.Provider>
  );
}