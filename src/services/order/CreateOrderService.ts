import prismaClient from "../../prisma";


interface OrderRequest {
  table: number;
  name: string;
}

class CreateOrderService {

  async execute({ table, name }: OrderRequest) {
    // Validações
    if (!table || table <= 0) {
      throw new Error("Obrigatório informar o número da mesa");
    }

    const orderAlreadyExists = await prismaClient.order.findFirst({
      where: {
        table: table,
      },
    });
    if (orderAlreadyExists) {
      throw new Error("Já existe uma mesa aberta com esse número");
    }


    // Cria o pedido
    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name,
      },
      select: {
        id: true,
        table: true,
        name: true,
      },
    });

    return {
        id: order.id,
        table: order.table,
        name: order.name,
        message: `Mesa ${order.table} aberta com sucesso!`
    }
  }
}

export { CreateOrderService };