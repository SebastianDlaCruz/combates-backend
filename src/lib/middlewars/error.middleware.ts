import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Error en el servidor';
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode
  })

}