import prismaClient from "../../prisma";

class ListOrdersService {
  async execute() {
    // Fetch all orders from the database
    const orders = await prismaClient.order.findMany({
      where: {
        draft: false, // Only fetch orders that are not drafts
        status: false, // Only fetch orders that are finished
      },
      include: {
        items: {
          include: {
            product: true, // Inclui o produto em cada item
          },
        },
      },
    });

    // Se não houver pedidos, lança um erro
    if (!orders || orders.length === 0) {
      throw new Error("Nenhum pedido encontrado!");
    }

    // Return the list of orders
    return {
      orders: orders.map((order) => ({
        id: order.id,
        status: order.status,
        draft: order.draft,
        table: order.table,
        name: order.name,
        createAt: order.createdAt,
        updateAt: order.updatedAt,
      })),
      message: "Pedidos listados com sucesso!",
    };
  }
}

export { ListOrdersService };
