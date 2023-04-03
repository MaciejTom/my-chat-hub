import { createContext, useEffect, useState, PropsWithChildren, ReactNode } from "react";
import { authUser } from "../api/authApi";

export interface WebSocketContextInterface {
    webSocket: WebSocket | null,
}

export const WebSocketContext = createContext({} as WebSocketContextInterface);

export function WebSocketProvider(props: PropsWithChildren<ReactNode>) {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

//   const [user, setUser] = useState("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [id, setId] = useState("");

//   useEffect(() => {
//     const authData = async () => {
//       setIsLoading(true);
//       const res = await authUser();
//       setId(res?.userId || "");
//       setUser(res?.username || "");
//       setIsLoading(false);
//     };
//     authData();
//   }, []);

  return (
    <WebSocketContext.Provider
      value={{
        webSocket
      }}
    >
      {props.children}
    </WebSocketContext.Provider>
  );
}
