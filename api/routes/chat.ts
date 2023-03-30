import express, { Express, Request, Response } from "express";

import { getMessages, getPeople } from "../controllers/chat";

export const chatRouter = express.Router();

chatRouter.get("/messages/:userId", getMessages);
chatRouter.get("/people", getPeople);
