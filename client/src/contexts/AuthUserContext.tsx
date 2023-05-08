import { createContext, useEffect, useState,  ReactNode } from "react";
import { authUser } from "../api/authApi";

export interface AuthUserContextInterface {
  user: string;
  isLoading: boolean;
  setUser: (user: string) => void;
  id: string;
  setId: (id: string) => void;
  multiply: () => void;
}

export const AuthUserContext = createContext({} as AuthUserContextInterface);

export function AuthUserProvider(props: {children: ReactNode}) {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id, setId] = useState("");

  const multiply = () => { setUser("nowwyyyyyyyyyyyy")}

  useEffect(() => {
    const authData = async () => {
      setIsLoading(true);
      const res = await authUser();
      setId(res?.userId || "");
      setUser(res?.username || "");
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
        setId,
        multiply
      }}
    >
      {props.children}
    </AuthUserContext.Provider>
  );
}
