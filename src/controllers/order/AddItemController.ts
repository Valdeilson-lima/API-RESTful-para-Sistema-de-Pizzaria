import { Request, Response, NextFunction } from "express";
import { AddItemService } from "../../services/order/AddItemService";


class AddItemController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { orderId, productId, amount } = req.body;
    const addItemService = new AddItemService();

    try {
      const order = await addItemService.execute({
        orderId,
        productId,
        amount,
      });

      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

export { AddItemController };