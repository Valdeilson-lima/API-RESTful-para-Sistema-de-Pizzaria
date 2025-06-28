import prismaClient from "../../prisma";
import { compare } from "bcrypt";


interface AuthUserRequest {
    email: string;
    password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    // Validate input
    if (!email || !password) {
      throw new Error("Preencha todos os campos");
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Formato de Email inválido");
    }

    // Check if user exists
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuário ou senha incorretos");
    }

    // Compare password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorretos");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export { AuthUserService };