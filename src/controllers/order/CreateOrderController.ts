import { Request, Response, NextFunction } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { table, name } = req.body;
    const createOrderService = new CreateOrderService();

    try {
      const order = await createOrderService.execute({
        table,
        name,
      });

      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

export { CreateOrderController };