import express, { Express, Request, Response } from "express";

import { register, login, authUser, logout } from "../controllers/auth";

export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/authUser", authUser);
router.get("/logout", logout);
