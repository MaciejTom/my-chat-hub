import { StatusCodes } from 'http-status-codes';
import {CustomAPIError} from './custom-api';
export class BadRequestError extends CustomAPIError {
    statusCode: StatusCodes;
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}