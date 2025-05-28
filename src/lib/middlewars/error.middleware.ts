import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

  err.statusCode = err.statusCode;
  err.message = err.message;
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode
  })

}