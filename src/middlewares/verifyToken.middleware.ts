import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from "../errors/app.errors";

export class VerifyToken {
  static execute(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError('Access denied. No token provided.', 401);
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        throw new AppError('Invalid token.', 401);
      }
      res.locals.decode = decoded;
      next();
    });
  }
}
