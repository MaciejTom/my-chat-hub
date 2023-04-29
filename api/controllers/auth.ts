import express, { Express, Request, Response } from "express";
import {User, IUser} from "../models/User";
import StatusCodes from "http-status-codes";
import {BadRequestError, UnauthenticatedError } from "../errors";
const cookieParser = require('cookie-parser');
import jwt from "jsonwebtoken";
import { WebSocketManager } from "../webSocket/WebSocketManager";
import { JwtPayload } from "../models/JwtPayload";

export const register = async (req: Request, res: Response) => {
  const user:IUser  = req.body;
  const createdUser = await User.create(user);
  const token = createdUser.createJWT();
  res.cookie('token', token, { sameSite: 'none', secure: true }).status(StatusCodes.CREATED).json({id: createdUser._id});
};
//CHECK IT IS PROPER OBJECT ABOVE (SAME SITE)

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.cookie('token', token, {sameSite:'none', secure:true}).json({
    id: user._id,
  });
};
export const authUser = (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (token) {
    const userData = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload;
    res.json(userData);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json('no token');
  }
};
export const logout = (req: Request, res: Response) => {
  res.cookie('token', '', {sameSite:'none', secure: true }).json('ok');
};

