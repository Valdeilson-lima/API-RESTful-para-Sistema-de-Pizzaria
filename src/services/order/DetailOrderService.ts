import prismaClient from "../../prisma";

interface DetailRequest {
  orderId: string;
}

class DetailOrderService {
  async execute({ orderId }: DetailRequest) {
    // Validação: se não enviar o id do pedido
    if (!orderId) {
      throw new Error("ID do pedido não enviado!");
    }
    // Fetch the order details from the database
    const orders = await prismaClient.item.findMany({
      where: {
        orderId: orderId,
      },
      include: {
        product: true,
        order: true, // Include the order details
      },
    });

    // Validação: se enviar um id de pedido errado (não encontrado)
    if (!orders || orders.length === 0) {
      throw new Error("Pedido não encontrado!");
    }

    // Return the order details
    return  orders
  }
}

export { DetailOrderService };
