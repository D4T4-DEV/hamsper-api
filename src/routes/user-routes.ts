import express from "express";
import * as userController from "../controllers/UserController";
import { validateRequest } from "../middlewares/validateRequest";
import { createUserSchema } from "../schemas/user.schema";

const UserRouter = express.Router();

// POST /user/
// Crea un nuevo hamster, pero necesita tener clave API
UserRouter.post(
  "/",
  validateRequest(createUserSchema),
  userController.createUser,
);

export default UserRouter;
