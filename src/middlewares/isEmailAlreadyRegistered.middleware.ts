import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/app.errors";

export class IsEmailAlreadyRegistered {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const existingUser = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (existingUser) {
      throw new AppError("This email is already registered", 409);
    }

    next();
  }
}
