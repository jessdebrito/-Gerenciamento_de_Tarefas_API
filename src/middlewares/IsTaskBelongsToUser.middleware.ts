import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/app.errors";

export class IsTaskBelongsToUser {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const taskId = Number(req.params.id);
    const userId = res.locals.decode.id;

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (!task) {
      throw new AppError("Task does not belong to the user", 403);
    }

    next();
  }
}
