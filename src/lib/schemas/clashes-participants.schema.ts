import { z } from 'zod';

export const clashesParticipants = z.object({
  id_boxer: z.string({
    invalid_type_error: 'El id del boxeador  tiene que ser un uuid ',
    required_error: 'El uuid del boxeador uno es requerido'
  }),
  id_clashes: z.number({
    invalid_type_error: 'El id  del enfrentamiento  tiene que ser un numero entero',
    required_error: 'El id  del enfrentamiento  es requerido'
  })
})