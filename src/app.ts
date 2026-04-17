import express from "express";
import AppRouter from "./routes/router";
import { handleError } from "./middlewares/handleError";

const app = express();

// Middlewares globales

// Devuelve un middleware que solo analiza JSON y solo examina las solicitudes donde
// el encabezado Content-Type coincide con la opción de tipo.
app.use(express.json());

// Ruteo de la API
app.use("/", AppRouter);

// Middlewares de manejo de errores
app.use(handleError);

export default app;
