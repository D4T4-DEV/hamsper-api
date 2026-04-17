export interface UserPayload {
  id: string;
  full_name: string;
  email: string;
  created_at?: Date | string;
}

export class User implements UserPayload {
  public id: string;
  public full_name: string;
  public email: string;
  public created_at?: Date;

  constructor(payload: UserPayload) {
    this.id = payload.id;
    this.full_name = payload.full_name;
    this.email = payload.email;
    // Convertimos la fecha si existe
    this.created_at = payload.created_at
      ? new Date(payload.created_at)
      : undefined;
  }

  /**
   * Limpia los datos para el cliente
   */
  toClient() {
    return {
      id: this.id,
      full_name: this.full_name,
      email: this.email,
      member_since: this.created_at?.toISOString().split("T")[0], // Ejemplo: 2026-04-16
    };
  }
}
