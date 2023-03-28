import express, { Express, Request, Response } from "express";
import {getUserDataFromRequest} from '../helpers/getUserDataFromRequest'
import {Message} from '../models/Message'

export const fetchMessage = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const userData = await getUserDataFromRequest(req);
    const ourUserId = userData.userId;
    const messages = await Message.find({
      sender:{$in:[userId,ourUserId]},
      recipient:{$in:[userId,ourUserId]},
    }).sort({createdAt: 1});
    res.json(messages);
  };