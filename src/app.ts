import express from "express";
import AppRouter from "./routes/router";

const app = express();

// Middlewares globales
// app.use(express.json());

// Ruteo de la API
app.use("/", AppRouter);

export default app;
