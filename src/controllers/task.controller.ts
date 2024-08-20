import { NextFunction, Request, Response } from "express";
import { TaskServices } from "../services";
import { inject, injectable } from "tsyringe";

@injectable()
export class TaskControllers {

    constructor(@inject("TaskServices") private taskServices: TaskServices) {}

    async create(req: Request, res: Response) {
        const userId = res.locals.decode.id; 
        const response = await this.taskServices.create(userId, req.body);
        return res.status(201).json(response);
    }

    async findMany(req: Request, res: Response) {
        const categoryParam = req.query.category;
        const response = await this.taskServices.findMany(categoryParam as string);
        return res.status(200).json(response.slice(0, 2));
    }

    async findOne(req: Request, res: Response) {
        const response = await this.taskServices.findOne(Number(req.params.id));
        return res.status(200).json(response);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const response = await this.taskServices.update(Number(req.params.id), req.body);
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        await this.taskServices.delete(Number(req.params.id));
        return res.status(204).send();
    }
}
