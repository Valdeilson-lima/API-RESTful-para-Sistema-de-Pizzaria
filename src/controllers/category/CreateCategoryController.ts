import { Request, Response, NextFunction } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
        const { name } = request.body;
    
        const createCategoryService = new CreateCategoryService();
    
        const category = await createCategoryService.execute({
          name,});
    
        return response.json(category);
        
    } catch (err) {
        next(err);
        
    }
   
   
  }
}

export { CreateCategoryController };