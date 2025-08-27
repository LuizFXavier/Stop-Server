import { Request, Response, NextFunction } from 'express';

export function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction 
) {

  console.error(error);

  response.status(500).json({ error: 'Internal Server Error' });

}