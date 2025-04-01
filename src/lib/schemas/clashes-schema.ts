import { z } from 'zod';

export const clashesSchema = z.object({
  id_category: z.number({
    invalid_type_error: 'El id de la categoría  que ser un numero entero',
    required_error: 'El id de la categoría es requerido'
  }),
  id_type_clashes: z.number({
    invalid_type_error: 'El id del tipo del enfrentamiento  que ser un numero entero',
    required_error: 'El id del tipo del enfrentamiento es requerido'
  }),
  number: z.number({
    invalid_type_error: 'El numero del enfrentamiento  que ser un numero entero',
    required_error: 'El numero del enfrentamiento es requerido'
  }),
  rounds: z.number({
    invalid_type_error: 'Los rounds tiene que  ser un numero entero',
    required_error: 'Los rounds tiene que ser requerido'
  }),
  id_state: z.number({
    invalid_type_error: 'El id del estado tiene que  ser un numero entero',
    required_error: 'El id del estado tiene que ser requerido'
  }),
});
