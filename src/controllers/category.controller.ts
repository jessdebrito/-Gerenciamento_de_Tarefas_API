import { Request, Response } from "express";
import { CategoryServices } from "../services";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryControllers {
    constructor(@inject("CategoryServices") private categoryServices: CategoryServices) {}
    
    async create(req: Request, res: Response) {
        const { id } = res.locals.decode;
        const category = await this.categoryServices.create( req.body, id);
        return res.status(201).json(category);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const categoryId = Number(id);
        await this.categoryServices.delete(categoryId);
        return res.status(204).send();
    }
}
