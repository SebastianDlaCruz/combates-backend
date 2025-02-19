import { z } from 'zod';

export const schoolSchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre y apellido tiene que ser una cadena de texto ',
    required_error: 'El nombre y apellido es requerido'
  })
});
