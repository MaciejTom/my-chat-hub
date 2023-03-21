import { createContext, useEffect, useState } from "react";
import axios from "axios";

// export const UserContext = createContext({});

interface UserContextInterface {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const UserContext = createContext<UserContextInterface>({
  username: null,
  setUsername: () => null,
  id: null,
  setId: () => null,
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get("/profile").then((response) => {
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);
  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
