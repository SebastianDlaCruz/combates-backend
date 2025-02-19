import { z } from 'zod';

export const stateSchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre del estado tiene que ser una cadena de texto ',
    required_error: 'El nombre del estado es requerido'
  })
});
