import { HttpStatusCode } from '@/constants/httpCodeStatus';

class AppError extends Error {
  public readonly statusCode: HttpStatusCode;

  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
