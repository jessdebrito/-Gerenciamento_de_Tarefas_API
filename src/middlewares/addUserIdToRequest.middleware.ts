import { Request, Response, NextFunction } from "express";

export const AddUserIdToRequest = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;
    if (userId) {
        req.body.userId = userId;
    }
    next();
};