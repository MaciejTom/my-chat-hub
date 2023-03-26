//@ts-nocheck
import {CustomAPIError} from '../errors';
import StatusCodes from 'http-status-codes';
import {Request, Response, NextFunction } from "express";
export const errorHandlerMiddleware = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ error: customError.msg });
}
