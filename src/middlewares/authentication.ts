import { Request, Response, NextFunction } from "express";
import { authenticationService } from "../services/AuthenticationService";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Obtener la clave de los headers
    const apiKey = req.headers["x-api-key"] as string;

    if (!apiKey) {
      return res.status(401).json({ error: "No API Key provided" });
    }

    // Buscar al usuario
    const user = await authenticationService.validateApiKey(apiKey);

    if (!user) {
      return res.status(403).json({ error: "Invalid API Key" });
    }

    // Inyectar el usuario en el request para que los controllers lo usen
    req.auth = user;

    // Continuar al controller
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during authentication" });
  }
};
