import express, { Express, Request, Response } from "express";
import {User, IUser} from "../models/User";
import StatusCodes from "http-status-codes";
import {BadRequestError, UnauthenticatedError } from "../errors";
const cookieParser = require('cookie-parser');
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const user:IUser  = req.body.user;
  const createdUser = await User.create(user);
  const token = createdUser.createJWT();
  res.cookie('token', token, {sameSite: 'none', secure: true}).status(StatusCodes.CREATED).json({id: createdUser});
};


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body.user;

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
  res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
};
export const profile = (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(StatusCodes.).json('no token');
  }
});
