import { prisma } from "../database/prisma";
import { TCategory, TCategoryCreate } from "../schemas/category.schemas";
import { injectable } from 'tsyringe';

@injectable()
export class CategoryServices {
    async create(body: TCategoryCreate, userId: number): Promise<TCategory> {
        console.log(userId)
        const data = await prisma.category.create({
            data: {
                ...body,
                userId: userId
            }
        });
        return data;
    }
    async delete(id: number): Promise<void> {
        await prisma.category.delete({ where: { id } });
    }
}
