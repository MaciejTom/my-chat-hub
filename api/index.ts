import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv").config();
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
import "express-async-errors";
import WebSocket, { WebSocketServer } from "ws";
import ws from "ws";
import {WebSocketManager} from './webSocket/WebSocketManager'
import http from "http";
//ROUTES
import { authRouter } from "./routes/auth";
import { chatRouter } from "./routes/chat";
const notFoundMiddleware = require("./middleware/not-found");
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { onConnection } from "./handlers/connection";
import { ExtendedWebSocket } from "./models/ExtendedWebSocket";

const cors = require("cors");
const app: Express = express();

app.use(express.json());

// app.use(notFoundMiddleware);
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
const port = 4000;
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next()
// });
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", chatRouter);
app.use(errorHandlerMiddleware);

/////WEB SOCKET

const start = async () => {
  const dbAddress = process.env.MONGO_URI;
  if (dbAddress) {
    try {
      await connectDB(dbAddress);
      const server = app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
     
      new WebSocketManager(server);
      console.log("NEW CONNECTION");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.warn("Theres's no db address!");
  }
};

start();
