import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Check if the user has a token
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "Token inválido" });
  }

  const parts = authToken.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return response.status(401).json({ error: "Token inválido" });
  }

  const [, token] = parts;

  try {
    // Verify if the token is valid
    const { sub } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    // Get user ID from the token
    request.userId = sub;

    // Call the next middleware or route handler
    


    return next();
  } catch (err) {
    return response.status(401).json({ error: "Token inválido" });
  }
}
