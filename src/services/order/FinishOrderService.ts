import prismaClient from "../../prisma";



interface FinishOrderRequest {
  orderId: string;
}

class FinishOrderService {
  async execute({ orderId }: FinishOrderRequest) {
    // Validate if orderId is provided
    if (!orderId) {
      throw new Error("ID do pedido não enviado!");
    }

    // Update the order status to 'FINISHED'
    const updatedOrder = await prismaClient.order.update({
      where: { id: orderId },
      data: { status: true },
    });

    // Return the updated order
    return {
      id: updatedOrder.id,
      status: updatedOrder.status,
      draft: updatedOrder.draft,
      table: updatedOrder.table,
      name: updatedOrder.name,
      createAt: updatedOrder.createdAt,
      updateAt: updatedOrder.updatedAt,
      message: "Pedido finalizado com sucesso!",
    };
  }
}

export { FinishOrderService };
