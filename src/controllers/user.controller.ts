import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { UserServices } from '../services';

@injectable()
export class UserControllers {
  constructor(@inject('UserServices') private userServices: UserServices) {}

  async register(req: Request, res: Response) {
    const user = await this.userServices.register(req.body);

      return res.status(201).json(user);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const userLogin = await this.userServices.login(req.body);

      return res.status(200).json(userLogin);
    }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals.decode;
    const response = await this.userServices.getUser(id);
    return res.status(200).json(response);
  }
}
