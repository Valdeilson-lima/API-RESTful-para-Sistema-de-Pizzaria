import { Request, Response, NextFunction } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';


class ListOrdersController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const listOrdersService = new ListOrdersService();

    try {
      const result = await listOrdersService.execute();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { ListOrdersController };


