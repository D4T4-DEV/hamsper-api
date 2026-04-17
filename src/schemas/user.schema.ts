import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    full_name: z.string().min(1, "El nombre debe tener minimo un caracter"),
    email: z.email("El correo debe ser un correo valido"),
  }),
});
