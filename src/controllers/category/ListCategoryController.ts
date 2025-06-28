import e, { Request, Response, NextFunction } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";


class ListCategoryController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const listCategoryService = new ListCategoryService();

      const categories = await listCategoryService.execute();

      return response.json(categories);
    } catch (err) {
      next(err);
    }
  }
}

export { ListCategoryController };