import { Response, Request, NextFunction } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
        const userId = request.userId; // Get the user ID from the request
        
        
        const detailUserService = new DetailUserService();
    
        const user = await detailUserService.execute(userId);
    
        return response.status(200).json(user);

    } catch (err) {
      next(err);
    }
  }
}

export { DetailUserController };