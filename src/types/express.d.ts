declare global {
  namespace Express {
    interface Request {
      // Propiedades para obtener datos validados
      validatedData?: {
        body: any;
        query: any;
        params: any;
      };
    }
  }
}

export {};
