import { NextFunction, Response, Request } from "express";

export const getAllHamsters = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Obtenemos la pagina
    const pageNumber =
      parseInt(req.validatedData?.query.pageNumber as string) || 1;

    // Obtenemos el tamaño de la pagina (resultados por pagina)
    const pageSize =
      parseInt(req.validatedData?.query.pageSize as string) || 10;

    console.log("--- Operativa: Obtener todos los hamsters ---");
    return res.status(200).json({});
  } catch (error) {
    console.error("Error en getAllHamsters:", error);
    next(error);
  }
};

export const getMyHamsters = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("--- Operativa: Obtener mis hamsters (propios) ---");

    // console.log(`Clave API solicitante: ${req.api_key || "Anónimo"}`);
    return res.status(200).json({});
  } catch (error) {
    console.error("Error en getMyHamsters:", error);
    next(error);
  }
};

export const createHamster = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("--- Operativa: Crear nuevo hamster ---");
    console.log("Datos recibidos:", req.body);
    return res.status(201).json({});
  } catch (error) {
    console.error("Error en createHamster:", error);
    next(error);
  }
};

export const updateHamster = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { hamsterId } = req.validatedData?.params;
    console.log(`--- Operativa: Actualizar hamster ---`);
    console.log(`ID a modificar: ${hamsterId}`);
    console.log("Nuevos datos:", req.body);
    return res.status(200).json({});
  } catch (error) {
    console.error("Error en updateHamster:", error);
    next(error);
  }
};

export const deleteHamster = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { hamsterId } = req.validatedData?.params;
    console.log(`--- Operativa: Eliminar hamster ---`);
    console.log(`ID a eliminar: ${hamsterId}`);
    return res.status(200).json({});
  } catch (error) {
    console.error("Error en deleteHamster:", error);
    next(error);
  }
};
