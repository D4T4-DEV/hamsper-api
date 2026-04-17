import { Pool } from "pg";
import { poolPostgres } from "../core/db/connector";
import { generateApiKeyHash } from "../core/utils/hash";

export interface UserSession {
  id: string;
}

export class AuthenticationService {
  constructor(private pool: Pool) {}

  /**
   * Valida una API Key y devuelve la información del usuario
   */
  async validateApiKey(apiKey: string): Promise<UserSession | null> {
    const hash = generateApiKeyHash(apiKey);

    const query = `
      SELECT u.id, u.full_name 
      FROM users u
      JOIN api_keys ak ON u.id = ak.user_id
      WHERE ak.api_key_hash = $1
      LIMIT 1
    `;

    const res = await this.pool.query(query, [hash]);

    if (res.rows.length === 0) {
      return null;
    }

    return {
      id: res.rows[0].id,
    };
  }

  /**
   * Método para crear nuevas llaves en el futuro
   */
  async createApiKey(userId: string, apiKey: string): Promise<void> {
    const keyHash = generateApiKeyHash(apiKey);
    await this.pool.query(
      "INSERT INTO api_keys (user_id, api_key_hash) VALUES ($1, $2)",
      [userId, keyHash],
    );
  }
}

// Exportamos la instancia única (Singleton)
export const authenticationService = new AuthenticationService(poolPostgres);
