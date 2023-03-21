import {StatusCodes} from 'http-status-codes';
import {CustomAPIError} from './custom-api';
export class UnauthenticatedError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
