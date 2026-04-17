import express from "express";
import HamsterRouter from "./hamster-routes";
import UserRouter from "./user-routes";

const AppRouter = express.Router();

// Endpoint correspondiente a acciones de hamsters
AppRouter.use("/hamster", HamsterRouter);
AppRouter.use("/user", UserRouter);

export default AppRouter;
