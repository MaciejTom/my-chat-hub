
import http from "http";
import jwt from "jsonwebtoken";
import {JwtPayload} from '../models/JwtPayload';
import {ExtendedWebSocket} from '../models/ExtendedWebSocket';
import { WebSocketServer } from "ws";
import {onMessage} from './onMessage';
export const onConnection = async (connection: ExtendedWebSocket, req: http.IncomingMessage, wss: WebSocketServer) => {

  const notifyAboutOnlinePeople = () => {
    [...wss.clients].forEach(client => { 
      client.send(JSON.stringify({
        online: [...wss.clients].map(c => ({userId:c.userId,username:c.username})),
      }));
    });
  }
  interface UserData {
    userId: string, username: string
  }
  const cookies = req.headers.cookie;  
  if (cookies) {
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.startsWith("token="));
    if (tokenCookieString) {
      const token = tokenCookieString.split("=")[1];
      if (token) {
       jwt.verify(token, String(process.env.JWT_SECRET), {}, (err, userData ) => {
          if (err) throw err;
          const decoded = userData as JwtPayload;
          connection.userId = decoded.userId
          connection.username = decoded.username
        }) 
           
      }
    }
  }
  notifyAboutOnlinePeople();
  connection.on('message', (message) => onMessage(message, connection, wss))
};

