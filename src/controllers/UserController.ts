import { NextFunction, Response, Request } from "express";
import { userService } from "../services/UserService";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email } = req.validatedData?.body;

    console.info("--- Operativa: Crear un nuevo usuario ---");

    const user = await userService.createUser({
      full_name,
      email,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error en createUser:", error);
    next(error);
  }
};
