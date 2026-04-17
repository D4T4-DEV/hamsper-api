export const PORT = Number(process.env.PORT) || 3002;

export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
export const POSTGRES_CONECTIONS =
  Number(process.env.POSTGRES_CONECTIONS) || 20;
export const POSTGRES_IDLE_CONECTIONS =
  Number(process.env.POSTGRES_IDLE_CONECTIONS) || 2000;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
