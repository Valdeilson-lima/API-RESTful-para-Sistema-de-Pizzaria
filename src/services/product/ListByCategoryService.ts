import prismaClient from "../../prisma";

interface ProductRequest {
  categoryId: string;
}


class ListByCategoryService  {

  async execute({ categoryId }: ProductRequest) {
    // Validações
    if (!categoryId || categoryId === "") {
      throw new Error("Obrigatório informar o ID da categoria");
    }

    // Busca os produtos pela categoria
    const findByCategory = await prismaClient.product.findMany({
      where: {
        categoryId: categoryId, // Filtra os produtos pela categoria informada
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
      },
    });

    return findByCategory;
  }
}

export { ListByCategoryService };