import { Router } from "express";
import { UserControllers } from "../controllers/user.controller";
import { container } from "tsyringe";
import { UserServices } from "../services";
import {
  IsEmailAlreadyRegistered,
  VerifyToken,
  ValidateBody,
} from "../middlewares";
import { userRegisterBodySchema } from "../schemas";

const userRouter = Router();
container.registerSingleton("UserServices", UserServices);
const userControllers = container.resolve(UserControllers);

userRouter.post(
  "/",
  ValidateBody.execute(userRegisterBodySchema),
  IsEmailAlreadyRegistered.execute,
  (req, res) => userControllers.register(req, res)
);
userRouter.post("/login", (req, res) => userControllers.login(req, res));
userRouter.get("/profile", VerifyToken.execute, (req, res) =>
  userControllers.getUser(req, res)
);

export { userRouter };
