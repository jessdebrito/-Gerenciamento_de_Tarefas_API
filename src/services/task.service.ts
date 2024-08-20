import { prisma } from "../database/prisma";
import { z } from "zod";
import { AppError } from "../errors/app.errors";
import { TTask, TTaskCreate, TTaskUpdate, TTaskReturn } from "../schemas/task.schemas";
import { injectable } from "tsyringe";

@injectable()
export class TaskServices {
    async create(userId: number, body: TTaskCreate): Promise<TTask> {
        if (body.categoryId) {
            const categoryExists = await prisma.category.findFirst({
                where: { id: body.categoryId }
            });
            if (!categoryExists) {
                throw new AppError("Category not found", 404);
            }
        }
        const data = await prisma.task.create({
            data: {
                ...body,
                userId 
            }
        });

        return TTaskReturn.extend({ categoryId: z.number().nullish() }).parse(data);
    }
    async findMany(categoryName?: string): Promise<TTask[]> {
        if (categoryName) {
            const data = await prisma.task.findMany({
                include: { category: true },
                where: { category: { name: { contains: categoryName, mode: "insensitive" } } }
            });

            return TTaskReturn.array().parse(data);
        }
        const data = await prisma.task.findMany({
            include: { category: true }
        });
        return TTaskReturn.array().parse(data);
    }
    async findOne(id: number): Promise<TTask | null> {
        const data = await prisma.task.findFirst({
            where: { id },
            include: { category: true }
        });
        if (!data) {
            throw new AppError("Task not found", 404);
        }
        return TTaskReturn.parse(data);
    }
    async update(id: number, body: TTaskUpdate): Promise<TTask> {
        const data = await prisma.task.update({
            where: { id },
            data: body
        });
        return TTaskReturn.extend({ categoryId: z.number().nullish() }).parse(data);
    }
    async delete(id: number): Promise<void> {
        await prisma.task.delete({
            where: { id }
        });
    }
}

