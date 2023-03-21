import {CustomAPIError} from '../errors';
import StatusCodes from 'http-status-codes';
import {Request, Response, NextFunction } from "express";
export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong try again later')
}
