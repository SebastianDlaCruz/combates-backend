import { z } from 'zod';

export const coachSchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre y apellido tiene que ser una cadena de texto ',
    required_error: 'El nombre y apellido es requerido'
  }),

  id_school: z.number({
    invalid_type_error: 'El id de la escuela tiene que ser un numero entero',
    required_error: 'El id de la escuela es requerido'
  }),
});
