import prismaClient from "../../prisma";
import { hash } from "bcrypt";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {

    // Validate input
    if (!name || !email || !password) {
      throw new Error("Preencha todos os campos");
    }
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Formato de Email inválido");

    }

    // Check if user already exists
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    
    if (userAlreadyExists) {
      throw new Error("Já existe um usuário cadastrado com esse e-mail");
    }

    const passwordHash = await hash(password, 8);

    // Create new user
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    return user;
  }
}

export { CreateUserService };
