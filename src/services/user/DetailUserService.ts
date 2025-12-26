import prismaClient from "../../prisma";

class DetailUserService {
  async execute(userId: string) {
    // Validate userId
    if (!userId) {
      throw new Error("Usuário não encontrado");
    }

    // Fetch user details from the database
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Check if user exists
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}

export { DetailUserService };
