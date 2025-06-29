import { Request, Response, NextFunction } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, description, categoryId } = req.body;

      const createProductService = new CreateProductService();

      // Verifica se o arquivo foi enviado
      if (!req.file) {
        throw new Error("É obrigatório enviar o arquivo da imagem do produto");
      } else {
        const { fieldname: banner } = req.file;

        const product = await createProductService.execute({
          name,
          price,
          description,
          banner,
          categoryId,
        });

        return res.json(product);
      }
    } catch (err) {
      next(err);
    }
  }
}

export { CreateProductController };
