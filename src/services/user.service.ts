import bcrypt from "bcrypt";
import jwt, { sign } from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/app.errors";
import {
  TLoginReturn,
  TUserLoginBody,
  TUserReturn,
  TUserRegisterBody,
  userReturnSchema,
} from "../schemas";
import { injectable } from "tsyringe";

@injectable()
export class UserServices {
  async register(body: TUserRegisterBody): Promise<TUserReturn> {
    console.log("oi");
    const hashPassword = await bcrypt.hash(body.password, 10);

    const newUser: TUserRegisterBody = {
      name: body.name,
      email: body.email,
      password: hashPassword,
    };

    const data = await prisma.user.create({ data: newUser });

    const schemaReturn = userReturnSchema.parse(data);

    console.log(schemaReturn);
    console.log(data);

    return schemaReturn;
  }

  async login(body: TUserLoginBody): Promise<TLoginReturn> {
    const user = await prisma.user.findFirst({ where: { email: body.email } });

    if (!user) {
      throw new AppError("User not registered", 404);
    }

    const compare = await bcrypt.compare(body.password, user.password);

    if (!compare) {
      throw new AppError("Email and password doesn't match.", 401);
    }

    const secret = process.env.JWT_SECRET as string;
    const token = sign({ id: user.id }, secret, {
      expiresIn: "12h",
      subject: String(user.id),
    });

    return {
      accessToken: token,
      user: userReturnSchema.parse(user),
    };
  }

  async getUser(id: number): Promise<TUserReturn> {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return userReturnSchema.parse(user);
  }
}
