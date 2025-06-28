import prismaClient from "../../prisma";


class ListCategoryService {

  async execute() {
    // Busca todas as categorias
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }
}


export { ListCategoryService };