export interface HamsterPayload {
  id: string;
  owner_id: string;
  owner_name?: string;
  name: string;
  breed: string;
  coat_type: string;
  coat_color: string;
  age: number;
  created_at?: Date;
  update_at?: Date;
}

export class Hamster {
  id: string;
  owner_id: string;
  owner_name?: string;
  name: string;
  breed: string;
  coat_type: string;
  coat_color: string;
  age: number;

  constructor(payload: HamsterPayload) {
    this.id = payload.id;
    this.owner_id = payload.owner_id;
    this.owner_name = payload.owner_name;
    this.name = payload.name;
    this.breed = payload.breed;
    this.coat_type = payload.coat_type;
    this.coat_color = payload.coat_color;
    this.age = payload.age;
  }

  // Metodo para poder darle una mejor respuesta al request
  toClient() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      characteristics: {
        breed: this.breed,
        coat_type: this.coat_type,
        coat_color: this.coat_color,
      },
      owner: this.owner_name ? { name: this.owner_name } : null,
    };
  }
}
