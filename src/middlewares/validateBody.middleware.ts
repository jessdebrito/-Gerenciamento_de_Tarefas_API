import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export class ValidateBody {
  static execute(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        schema.parse(req.body);
        next();
      }
    };
}
