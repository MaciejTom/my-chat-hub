
import http from "http";
import jwt from "jsonwebtoken";
import {JwtPayload} from '../models/JwtPayload';
import WebSocket from 'ws';

export const onConnection = (connection: WebSocket, req: http.IncomingMessage) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.startsWith("token="));
    if (tokenCookieString) {
      const token = tokenCookieString.split("=")[1];
      if (token) {
        const decoded  = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload
            connection.userId = decoded.userId
            connection.username = decoded.username
      }
    }
  }
};

