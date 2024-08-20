import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/app.errors";

export class IsCategoryBelongsToUser {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const categoryId = Number(req.params.id);
    const userId = res.locals.decode.id;

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    if (!category) {
      throw new AppError("Category does not belong to the user", 403);
    }

    next();
  }
}
