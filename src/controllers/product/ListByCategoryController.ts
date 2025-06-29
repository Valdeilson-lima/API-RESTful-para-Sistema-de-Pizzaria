import { Request, Response, NextFunction } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";



class ListByCategoryController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const  categoryId  = req.query.categoryId as string;
    const listByCategoryService = new ListByCategoryService();

    try {
      const products = await listByCategoryService.execute({ categoryId });
      return res.json(products);
    } catch (err) {
      next(err);
    }
  }
}

export { ListByCategoryController };