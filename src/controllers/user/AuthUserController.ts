import { Response, Request, NextFunction } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const authUserService = new AuthUserService();

      const auth = await authUserService.execute({
        email,
        password,
      })

      return res.json(auth);
    } catch (err) {
      next(err);
    }
  }
}

export { AuthUserController };
