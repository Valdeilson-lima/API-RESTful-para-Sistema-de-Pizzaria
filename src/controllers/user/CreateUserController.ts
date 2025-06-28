import { Response, Request, NextFunction } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export { CreateUserController };
