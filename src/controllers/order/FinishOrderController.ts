import { Request, Response, NextFunction } from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';


class FinishOrderController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { orderId } = req.body;

    const finishOrderService = new FinishOrderService();

    try {
      const order = await finishOrderService.execute({ orderId });
      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
}


export { FinishOrderController };