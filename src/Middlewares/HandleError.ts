import { NextFunction, Request, Response } from 'express';
import HttpErrorMessage from '../Utils/httpErrorMessage';

export default class HandleError {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { status, message } = error as HttpErrorMessage;
    res.status(status || 500).json({ message });
  }
}
