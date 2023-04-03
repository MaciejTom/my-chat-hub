import { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

export const UseWebSocket = () => {
  const context = useContext(WebSocketContext);
  return context;
};
