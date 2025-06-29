import { Request, Response, NextFunction } from 'express';
import { DetailOrderService } from '../../services/order/DetailOrderService';


class DetailOrderController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const  orderId  = req.query.orderId as string;

    const detailOrderService = new DetailOrderService();

    try {
      const orders = await detailOrderService.execute({ orderId });
      return res.json(orders);
    } catch (err) {
      next(err);
    }
  }
}

export { DetailOrderController };