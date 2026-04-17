import { ZodError } from "zod";
import { AppError } from "../core/errors/AppError";
import { Request, Response, NextFunction } from "express";

export const handleError = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Impresion del error en consola
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    const validationErrors = err.issues.map((issue) => ({
      // 'path' es un array (ej: ["body", "email"]), lo unimos para que sea legible
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      status: "validation_error",
      message: "Datos de solicitud no válidos",
      errors: validationErrors,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};
