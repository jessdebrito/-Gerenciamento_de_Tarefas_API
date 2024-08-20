import { Router } from "express";
import { TaskControllers } from "../controllers/task.controller";
import { TaskServices } from "../services";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";
import {
  ValidateBody,
  AddUserIdToRequest,
  IsTaskIdValid,
  VerifyTaskOwnership,
  VerifyToken,
} from "../middlewares";
import { container } from "tsyringe";

export const tasksRouter = Router();

container.registerSingleton("TaskServices", TaskServices);

const taskControllers = container.resolve(TaskControllers);

tasksRouter.use(VerifyToken.execute);
tasksRouter.post(
  "/",
  AddUserIdToRequest,
  ValidateBody.execute(taskCreateSchema),
  (req, res) => taskControllers.create(req, res)
);

tasksRouter.get("/", (req, res) => taskControllers.findMany(req, res));

tasksRouter.get(
  "/:id",
  IsTaskIdValid.execute,
  VerifyTaskOwnership.execute,
  (req, res) => taskControllers.findOne(req, res)
);

tasksRouter.patch(
  "/:id",
  ValidateBody.execute(taskUpdateSchema),
  IsTaskIdValid.execute,
  VerifyTaskOwnership.execute,
  (req, res, next) => taskControllers.update(req, res, next)
);

tasksRouter.delete(
  "/:id",
  IsTaskIdValid.execute,
  VerifyTaskOwnership.execute,
  (req, res, next) => taskControllers.delete(req, res, next)
);
