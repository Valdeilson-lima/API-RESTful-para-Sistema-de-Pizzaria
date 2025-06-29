import prismaClient from "../../prisma";

interface ItemRequest {
  orderId: string;
  productId: string;
  amount: number;
}

class AddItemService {
  async execute({ orderId, productId, amount }: ItemRequest) {
    // Validações
    if (!orderId || orderId === "") {
      throw new Error("Obrigatório informar o ID do pedido");
    }

    if (!productId || productId === "") {
      throw new Error("Obrigatório informar o ID do produto");
    }

    if (amount <= 0) {
      throw new Error("Obrigatório informar a quantidade do produto");
    }

    // Verifica se o pedido existe
    const orderExists = await prismaClient.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!orderExists) {
      throw new Error("Pedido não encontrado");
    }

    // Adiciona o item ao pedido
    const orderItem = await prismaClient.item.create({
      data: {
        orderId: orderId,
        productId: productId,
        amount: amount,
      },
    });

    return {
      id: orderItem.id,
      orderId: orderItem.orderId,
      productId: orderItem.productId,
      amount: orderItem.amount,
      message: `Item adicionado ao pedido com sucesso!`,
    };
  }
}

export { AddItemService };
