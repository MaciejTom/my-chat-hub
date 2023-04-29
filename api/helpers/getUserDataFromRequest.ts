import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../models/JwtPayload";

export const getUserDataFromRequest = async (
  req: Request
): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token;
    if (token) {
      const userData = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      resolve(userData);
    } else {
      reject("no token");
    }
  });
};
