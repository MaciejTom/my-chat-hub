import express, { Express, Request, Response } from "express";
import { WebSocketManager } from "../webSocket/WebSocketManager";
import { register, login, authUser, logout } from "../controllers/auth";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/authUser", authUser);
authRouter.get("/logout", logout);
