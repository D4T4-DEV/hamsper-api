import { PoolConfig, Pool } from "pg";
import {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_CONECTIONS,
  POSTGRES_IDLE_CONECTIONS,
} from "../env-container";

// Configuration to connection
const poolConfig: PoolConfig = {
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  max: POSTGRES_CONECTIONS, // Maximum number of clients in the pool
  idleTimeoutMillis: POSTGRES_IDLE_CONECTIONS, // How long a client is allowed to remain idle before being closed
};

// Create the Pool instance
export const poolPostgres = new Pool(poolConfig);
