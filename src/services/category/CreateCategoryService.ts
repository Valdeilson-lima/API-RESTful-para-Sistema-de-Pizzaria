import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {

  async execute({ name }: CategoryRequest) {
    // Validações
    if (!name || name === "") {
      throw new Error("Obrigatório informar o nome da categoria");
    }

    // Verifica se a categoria já existe
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name, // Verifica se já existe uma categoria com o mesmo nome
      },
    });

    if (categoryAlreadyExists) {
      throw new Error("Ja existe uma categoria com esse nome");
    }

    // Cria a categoria
    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }
}

export { CreateCategoryService };
