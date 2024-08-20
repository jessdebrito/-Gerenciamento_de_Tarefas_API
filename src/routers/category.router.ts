import { Router } from "express";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { CategoryControllers } from "../controllers/category.controller";

import { CategoryServices } from "../services";

import {
  ValidateBody,
  IsCategoryIdValid,
  VerifyToken,
  IsTaskBelongsToUser,
  IsCategoryBelongsToUser,
} from "../middlewares";

import { container } from "tsyringe";

export const categoryRouter = Router();

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

categoryRouter.post(
  "/",
  VerifyToken.execute,
  ValidateBody.execute(categoryCreateSchema),
  (req, res) => categoryControllers.create(req, res)
);

categoryRouter.delete(
  "/:id",
  VerifyToken.execute,
  IsCategoryIdValid.execute,
  IsCategoryBelongsToUser.execute,
  (req, res) => categoryControllers.delete(req, res)
);
