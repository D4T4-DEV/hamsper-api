import { z } from "zod";

export const getHamstersSchema = z.object({
  query: z.object({
    pageNumber: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
  }),
});

export const createHamsterSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder los 50 caracteres"),

    breed: z
      .string()
      .min(2, "La raza debe tener al menos 2 caracteres")
      .max(50, "La raza no puede exceder los 50 caracteres"),

    coat_type: z
      .string()
      .min(3, "El tipo de pelaje debe tener al menos 3 caracteres"),

    coat_color: z
      .string()
      .min(3, "El color del pelaje debe tener al menos 3 caracteres"),

    age: z.coerce
      .number()
      .int("La edad debe ser un número entero")
      .min(0, "La edad no puede ser negativa")
      .max(10, "La edad no puede ser mayor a 10 años"),
  }),
});

export const updateHamsterSchema = z.object({
  params: z.object({
    hamsterId: z.uuid("El hamster ID debe ser un uuid correcto"),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder los 50 caracteres")
      .optional(),

    breed: z
      .string()
      .min(2, "La raza debe tener al menos 2 caracteres")
      .max(50, "La raza no puede exceder los 50 caracteres")
      .optional(),

    coat_type: z
      .string()
      .min(3, "El tipo de pelaje debe tener al menos 3 caracteres")
      .optional(),

    coat_color: z
      .string()
      .min(3, "El color del pelaje debe tener al menos 3 caracteres")
      .optional(),

    age: z.coerce
      .number()
      .int("La edad debe ser un número entero")
      .min(0, "La edad no puede ser negativa")
      .max(10, "La edad no puede ser mayor a 10 años")
      .optional(),
  }),
});

export const deleteHamsterSchema = z.object({
  params: z.object({
    hamsterId: z.uuid("El hamster ID debe ser un uuid correcto"),
  }),
});
