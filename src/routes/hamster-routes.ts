import express from "express";
import * as hamsterController from "../controllers/HamsterController";
import { authMiddleware } from "../middlewares/authentication";
import { validateRequest } from "../middlewares/validateRequest";
import {
  createHamsterSchema,
  deleteHamsterSchema,
  getHamstersSchema,
  updateHamsterSchema,
} from "../schemas/hamster.schema";

const HamsterRouter = express.Router();

// GET /hamster/
// Obtiene todos los hamsters de la comunidad, en formato listado, no necesitas clave API
HamsterRouter.get(
  "/",
  validateRequest(getHamstersSchema),
  hamsterController.getAllHamsters,
);

// GET /hamster/
// Obtiene solo los hamsters creados con la clave API, pero necesita tener clave API
HamsterRouter.get(
  "/my-hamsters",
  authMiddleware,
  hamsterController.getMyHamsters,
);

// POST /hamster/
// Crea un nuevo hamster, pero necesita tener clave API
HamsterRouter.post(
  "/",
  authMiddleware,
  validateRequest(createHamsterSchema),
  hamsterController.createHamster,
);

// PATCH /hamster/
// Actualiza un hamster registrado por la clave API, pero necesita tener clave API
HamsterRouter.patch(
  "/:hamsterId",
  authMiddleware,
  validateRequest(updateHamsterSchema),
  hamsterController.updateHamster,
);

// DELETE /hamster/
// Elimina un hamster registrado por la clave API, pero necesita tener clave API
HamsterRouter.delete(
  "/:hamsterId",
  authMiddleware,
  validateRequest(deleteHamsterSchema),
  hamsterController.deleteHamster,
);

export default HamsterRouter;
