import { Request, Response, NextFunction } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";


class RemoveOrderController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const orderId = req.query.orderId as string;
    const removeOrderService = new RemoveOrderService();

    try {
      const order = await removeOrderService.execute({
        orderId,
      });

      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

export { RemoveOrderController };