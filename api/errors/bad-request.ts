const { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomAPIError {
    statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;