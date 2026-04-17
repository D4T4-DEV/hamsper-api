import express from "express";
import * as hamsterController from "../controllers/HamsterController";

const HamsterRouter = express.Router();

// GET /hamster/
// Obtiene todos los hamsters de la comunidad, en formato listado, no necesitas clave API
HamsterRouter.get("/", hamsterController.getAllHamsters);

// GET /hamster/
// Obtiene solo los hamsters creados con la clave API, pero necesita tener clave API
HamsterRouter.get("/my-hamsters", hamsterController.getAllHamsters);

// POST /hamster/
// Crea un nuevo hamster, pero necesita tener clave API
HamsterRouter.post("/", hamsterController.createHamster);

// PATCH /hamster/
// Actualiza un hamster registrado por la clave API, pero necesita tener clave API
HamsterRouter.patch("/:hamsterId", hamsterController.updateHamster);

// DELETE /hamster/
// Elimina un hamster registrado por la clave API, pero necesita tener clave API
HamsterRouter.delete("/:hamsterId", hamsterController.deleteHamster);

export default HamsterRouter;
