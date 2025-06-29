import prismaClient from "../../prisma";

interface RemoveOrderRequest {
  orderId: string;
}


class RemoveOrderService {

  async execute({ orderId }: RemoveOrderRequest) {
    // Validações
    if (!orderId || orderId === "") {
      throw new Error("Obrigatório informar o ID do pedido");
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

    // Remove o pedido
    const order = await prismaClient.order.delete({
      where: {
        id: orderId,
      },
    });

    return {
        id: order.id,
        table: order.table,
        status: order.status,
        draft: order.draft,
        name: order.name,
        message: `Pedido da mesa ${order.table} removido com sucesso!`
    }
  }
}

export { RemoveOrderService };