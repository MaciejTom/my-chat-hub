import express, { Express, Request, Response } from "express";

import { fetchMessage } from "../controllers/message";

export const messageRouter = express.Router();

messageRouter.get("/messages/:userId", fetchMessage);
