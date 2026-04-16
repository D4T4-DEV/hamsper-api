import express from "express";
import HamsterRouter from "./hamster-routes";

const AppRouter = express.Router();

// Endpoint correspondiente a acciones de hamsters
AppRouter.use("/hamster", HamsterRouter);

export default AppRouter;
