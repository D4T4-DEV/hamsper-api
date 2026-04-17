import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validamos y sobreescribimos los datos originales con los datos parseados
      // (esto limpia campos extra no definidos en el esquema)
      const parsedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Pasamos los datos validados al flujo
      req.validatedData = parsedData as { body: any; query: any; params: any };

      return next();
    } catch (error) {
      // Pasamos el error al manejador global
      return next(error);
    }
  };
};
