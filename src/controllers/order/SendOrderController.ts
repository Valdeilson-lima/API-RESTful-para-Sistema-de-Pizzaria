import { Request, Response, NextFunction } from 'express';
import { SendOrderService } from '../../services/order/SendOrderService';


class SendOrderController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { orderId } = req.body;

    const sendOrderService = new SendOrderService();

    try {
      const result = await sendOrderService.execute(orderId);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { SendOrderController };