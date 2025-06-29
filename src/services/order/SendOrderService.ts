import prismaClient from "../../prisma";

interface OrderRequest {
  orderId: string;
}



class SendOrderService {
  async execute(order_id: string) {

    // Validate the order_id
    if (!order_id) {
      throw new Error("ID do pedido é obrigatório");
    }
    // Check if the order exists
    const order = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!order) {
      throw new Error("Pedido não encontrado");
    }

    // Check if the order is already sent
    if (!order.draft) {
      throw new Error("Pedido já foi enviado");
    }

    // Update the order status to 'sent'
    const updatedOrder = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      },
    });

    return {
        id: updatedOrder.id,
        status: updatedOrder.status,
        table: updatedOrder.table,
        name: updatedOrder.name,
        message: "Pedido enviado com sucesso",
    }
  }
}

export { SendOrderService };