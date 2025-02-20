import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre de la categoría debe ser una cadena de texto ',
    required_error: 'El nombre de la categoría es requerido'
  }),
  weight: z.number({
    invalid_type_error: 'El peso debe ser un numero ',
    required_error: 'El peso es requerido'
  })
});
