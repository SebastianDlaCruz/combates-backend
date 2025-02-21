import { z } from 'zod';

export const clashesSchema = z.object({
  id_boxer_one: z.number({
    invalid_type_error: 'El id del boxeador uno tiene que ser un numero entero',
    required_error: 'El iid del boxeador uno es requerido'
  }),
  id_boxer_two: z.number({
    invalid_type_error: 'El id del boxeador dos tiene que ser un numero entero',
    required_error: 'El iid del boxeador dos es requerido'
  }),
  id_boxer_tree: z.number({
    invalid_type_error: 'El id del boxeador dos tiene que ser un numero entero'
  }),
  id_type_clashes: z.number({
    invalid_type_error: 'El id del tipo del enfrentamiento  que ser un numero entero',
    required_error: 'El id del tipo del enfrentamiento es requerido'
  }),
  number_clashes: z.number({
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
