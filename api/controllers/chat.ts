import express, { Express, Request, Response } from "express";
import { getUserDataFromRequest } from "../helpers/getUserDataFromRequest";
import { JwtPayload } from "../models/JwtPayload";
import { Message } from "../models/Message";
import { IUser, User } from "../models/User";

export const getMessages = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userData = await getUserDataFromRequest(req);
  const ourUserId = userData.userId;
  const messages = await Message.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 });
  res.json(messages);
};
export const getPeople = async (req: Request, res: Response) => {
  let users = await User.find({}, { _id: 1, username: 1 }) as Array<IUser>;
  users  = users.map(({ _id, username }) => ({ userId: _id, username })) 
  res.json(users);

};
