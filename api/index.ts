import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {connectDB} from "./db/connect";
import cookieParser from "cookie-parser";
import fs from 'fs';
import path from "path";
import "express-async-errors";

import {WebSocketManager} from './webSocket/WebSocketManager'

import { authRouter } from "./routes/auth";
import { chatRouter } from "./routes/chat";
import {notFoundMiddleware} from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";

const cors = require("cors");
const app: Express = express();
const config = dotenv.config();

app.use(express.json());
app.use(cookieParser());

const uploadsPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsPath)){
    fs.mkdirSync(uploadsPath);
}

app.use('/uploads', express.static(__dirname + '/uploads'));
console.log("Client url: " + process.env.CLIENT_URL)
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", chatRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  const dbAddress = process.env.MONGO_URI;
  if (dbAddress) {
    try {
      await connectDB(dbAddress);
      const server = app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
      new WebSocketManager(server);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.warn("Theres's no db address!");
  }
};

start();
