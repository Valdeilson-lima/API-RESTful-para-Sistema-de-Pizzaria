import prismaClient from "../../prisma";

interface ItemRequest {
  itemId: string;
}


class RemoveItemService {
  async execute({ itemId }: ItemRequest) {
    // Validações
    if (!itemId || itemId === "") {
      throw new Error("Obrigatório informar o ID do item");
    }

    // Verifica se o item existe
    const itemExists = await prismaClient.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!itemExists) {
      throw new Error("Item não encontrado");
    }

    // Remove o item
    const item = await prismaClient.item.delete({
      where: {
        id: itemId,
      },
    });

    return {
      id: item.id,
      orderId: item.orderId,
      productId: item.productId,
      amount: item.amount,
      message: `Item removido com sucesso!`,
    };
  }
}

export { RemoveItemService };