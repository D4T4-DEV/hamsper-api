declare global {
  namespace Express {
    interface Request {
      // Propiedades para obtener datos validados
      validatedData?: {
        body: any;
        query: any;
        params: any;
      };
      // Propiedades para identificacion de un usuario con api key
      auth?: {
        id: string;
      };
    }
  }
}

export {};
