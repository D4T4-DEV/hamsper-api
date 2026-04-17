import { Pool } from "pg";
import { Hamster, HamsterPayload } from "../models/Hamster";
import { poolPostgres } from "../core/db/connector";

export class HamsterService {
  constructor(private pool: Pool) {}

  /**
   * Obtiene una lista paginada de TODOS los hámsters (público)
   */
  async getAll(pageNumber: number, pageSize: number): Promise<Hamster[]> {
    const offset = (pageNumber - 1) * pageSize;
    const query = `
      SELECT h.*, u.full_name as owner_name
      FROM hamsters h
      JOIN users u ON h.user_id = u.id
      ORDER BY h.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const res = await this.pool.query(query, [pageSize, offset]);
    return res.rows.map((row) => new Hamster(row));
  }

  /**
   * Obtiene los hámsters de un usuario específico
   */
  async getByOwner(userId: string): Promise<Hamster[]> {
    const query = `
      SELECT h.*, u.full_name as owner_name
      FROM hamsters h
      JOIN users u ON h.user_id = u.id
      WHERE h.user_id = $1
      ORDER BY h.name ASC
    `;
    const res = await this.pool.query(query, [userId]);
    return res.rows.map((row) => new Hamster(row));
  }

  /**
   * Crea un nuevo hámster
   */
  async create(data: Partial<HamsterPayload>): Promise<Hamster> {
    const query = `
      INSERT INTO hamsters (user_id, name, age, breed, coat_type, coat_color)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      data.owner_id,
      data.name,
      data.age,
      data.breed,
      data.coat_type,
      data.coat_color,
    ];

    const res = await this.pool.query(query, values);
    return new Hamster(res.rows[0]);
  }

  /**
   * Actualiza un hámster (solo si pertenece al dueño)
   */
  async update(
    id: string,
    userId: string,
    data: Partial<HamsterPayload>,
  ): Promise<Hamster | null> {
    const query = `
      UPDATE hamsters 
      SET name = COALESCE($1, name), 
          age = COALESCE($2, age), 
          breed = COALESCE($3, breed),
          coat_type = COALESCE($4, coat_type),
          coat_color = COALESCE($5, coat_color),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 AND user_id = $7
      RETURNING *
    `;
    const values = [
      data.name,
      data.age,
      data.breed,
      data.coat_type,
      data.coat_color,
      id,
      userId,
    ];
    const res = await this.pool.query(query, values);

    return res.rowCount ? new Hamster(res.rows[0]) : null;
  }

  /**
   * Elimina un hámster
   */
  async delete(id: string, userId: string): Promise<boolean> {
    const query = `DELETE FROM hamsters WHERE id = $1 AND user_id = $2`;
    const res = await this.pool.query(query, [id, userId]);
    return (res.rowCount ?? 0) > 0;
  }
}

export const hamsterService = new HamsterService(poolPostgres);
