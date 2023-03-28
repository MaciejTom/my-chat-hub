import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../models/JwtPayload";

export const getUserDataFromRequest = async (req: Request): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
      const token = req.cookies?.token;
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET as string, {}, (err, userData) => {
          if (err) throw err;
          resolve(userData as JwtPayload);
        });
      } else {
        reject('no token');
      }
    });
  
  }