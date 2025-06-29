import { Request, Response, NextFunction } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService"; 


class RemoveItemController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const itemId = req.query.itemId as string;
    const removeItemService = new RemoveItemService();

    try {
      const order = await removeItemService.execute({
        itemId,
      });

      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

export { RemoveItemController };