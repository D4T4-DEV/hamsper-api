import { NextFunction, Response, Request } from "express";
import { hamsterService } from "../services/HamsterService";
import { AppError } from "../core/errors/AppError";

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

    console.info("--- Operativa: Obtener todos los hamsters ---");

    const hamsters = await hamsterService.getAll(pageNumber, pageSize);

    return res.status(200).json(hamsters.map((hamster) => hamster.toClient()));
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
    const userId = req.auth?.id;

    if (!userId) {
      throw new AppError(
        "La autenticacion no contiene los datos necesarios",
        400,
      );
    }

    console.info("--- Operativa: Obtener mis hamsters (propios) ---");
    console.info(`User id solicitante: ${userId || "Anónimo"}`);

    const myHamsters = await hamsterService.getByOwner(userId);

    return res
      .status(200)
      .json(myHamsters.map((hamster) => hamster.toClient()));
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
    const { name, breed, coat_type, coat_color, age } = req.validatedData?.body;
    const userId = req.auth?.id;
    if (!userId) {
      throw new AppError(
        "La autenticacion no contiene los datos necesarios",
        400,
      );
    }

    console.info("--- Operativa: Crear nuevo hamster ---");
    console.info("Datos recibidos:", req.validatedData?.body);

    const hamsterCreated = await hamsterService.create({
      owner_id: userId,
      name,
      breed,
      coat_type,
      coat_color,
      age,
    });

    return res.status(201).json(hamsterCreated.toClient());
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
    const { name, breed, coat_type, coat_color, age } = req.validatedData?.body;
    const { hamsterId } = req.validatedData?.params;
    const userId = req.auth?.id;

    if (!userId) {
      throw new AppError(
        "La autenticacion no contiene los datos necesarios",
        400,
      );
    }

    console.info(`--- Operativa: Actualizar hamster ---`);
    console.info(`ID a modificar: ${hamsterId}`);
    console.info("Nuevos datos:", req.validatedData?.body);

    const hamsterUpdated = await hamsterService.update(hamsterId, userId, {
      name,
      breed,
      coat_type,
      coat_color,
      age,
    });

    return res.status(200).json(hamsterUpdated?.toClient());
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
    const userId = req.auth?.id;

    if (!userId) {
      throw new AppError(
        "La autenticacion no contiene los datos necesarios",
        400,
      );
    }

    console.info(`--- Operativa: Eliminar hamster ---`);
    console.info(`ID a eliminar: ${hamsterId}`);

    const wasDeleted = await hamsterService.delete(hamsterId, userId);

    if (!wasDeleted) {
      throw new AppError(
        "No se encontró el hámster o no tienes permiso para eliminarlo",
        404,
      );
    }

    return res.status(204).json();
  } catch (error) {
    console.error("Error en deleteHamster:", error);
    next(error);
  }
};
