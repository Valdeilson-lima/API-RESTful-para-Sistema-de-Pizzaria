import prismaClient from "../../prisma";

// Interface for product request
interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  categoryId: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    categoryId,
  }: ProductRequest) {
    const productAlreadyExists = await prismaClient.product.findFirst({
      where: {
        name: name, // Check if a product with the same name already exists
      },
    });
    if (productAlreadyExists) {
      throw new Error("Ja existe um produto com esse nome");
    }


    // Create the product
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: banner,
        categoryId: categoryId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        categoryId: true,
      },
    });
    return product;
  }
}

export { CreateProductService };
