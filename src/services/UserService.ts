import { Pool } from "pg";
import { poolPostgres } from "../core/db/connector";
import { generateApiKeyHash } from "../core/utils/hash";
import { User, UserPayload } from "../models/User";
import { AppError } from "../core/errors/AppError";
import { generateApiKeys } from "../core/utils/generators";

export class UserService {
  constructor(private pool: Pool) {}

  /**
   * Registra un nuevo usuario y genera su API Key inicial.
   * Retorna el objeto User y la llave plana (solo se ve una vez).
   */
  async createUser(data: Partial<UserPayload>): Promise<User | null> {
    const client = await this.pool.connect();

    try {
      // Iniciamos una transacción para que ambas inserciones sean atómicas
      await client.query("BEGIN");

      // 1. Insertar el usuario en la base de datos
      const userQuery = `
        INSERT INTO users (full_name, email)
        VALUES ($1, $2)
        RETURNING id, full_name, email, created_at
      `;
      const userRes = await client.query(userQuery, [
        data.full_name,
        data.email,
      ]);

      if (userRes.rows.length === 0)
        throw new AppError("Failed to insert user", 409);

      const newUser = new User(userRes.rows[0]);

      // 2. Generar la API Key (Lógica de negocio)
      // Generamos un string aleatorio seguro y le ponemos un prefijo identificativo
      const plainApiKey = generateApiKeys();
      const hashedKey = generateApiKeyHash(plainApiKey);

      // 3. Guardar el HASH de la API Key vinculado al ID del usuario
      const keyQuery = `
        INSERT INTO api_keys (user_id, api_key_hash)
        VALUES ($1, $2)
      `;
      await client.query(keyQuery, [newUser.id, hashedKey]);

      // Si todo llegó hasta aquí sin errores, confirmamos en la DB
      await client.query("COMMIT");

      return new User({
        ...newUser,
        api_key: plainApiKey,
      });
    } catch (error: any) {
      // Si algo falló (email duplicado, error de red, etc.), deshacemos todo
      await client.query("ROLLBACK");
      if (error.code === "23505") {
        throw new AppError("El correo ya está registrado", 409);
      }
      console.error("Error en UserService.createUser:", error);
      throw error;
    } finally {
      // Liberamos la conexión al pool
      client.release();
    }
  }

  /**
   * Método de utilidad para buscar por email (evitar duplicados antes de insertar)
   */
  async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = $1";
    const res = await this.pool.query(query, [email]);
    return res.rows[0] ? new User(res.rows[0]) : null;
  }
}

export const userService = new UserService(poolPostgres);
