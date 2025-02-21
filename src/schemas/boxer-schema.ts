import { z } from 'zod';

export const boxerSchema = z.object({

  name: z.string({
    invalid_type_error: 'El nombre y apellido tiene que ser una cadena de texto ',
    required_error: 'El nombre y apellido es requerido'
  }),
  id_school: z.number({
    invalid_type_error: 'El id de la escuela tiene que ser un numero entero',
    required_error: 'El id de la escuela es requerido'
  }),
  disability: z.string({
    invalid_type_error: 'La discapacidad tiene que ser una cadena de texto ',
    required_error: 'La discapacidad es requerido'
  }),
  gender: z.string({
    invalid_type_error: 'El genero tiene que ser una cadena de texto ',
    required_error: 'El genero es requerido'
  }),
  corner: z.string({
    invalid_type_error: 'La esquina tiene que ser una cadena de texto ',
    required_error: 'La esquina es requerido'
  }),
  id_category: z.number({
    invalid_type_error: 'El id de la categoria tiene que ser un numero entero',
    required_error: 'El id de la de la categoria escuela es requerido'
  }),
  fights: z.number({
    invalid_type_error: 'La cantidad de peleas  tiene que ser un numero entero',
    required_error: 'La cantidad de peleas es requerido'
  }),
  weight: z.number({
    invalid_type_error: 'El peso  tiene que ser un numero decimal o entero',
    required_error: 'El  peso  tiene que ser requerido'
  }),
  id_coach: z.number({
    invalid_type_error: 'El id del entrenador tiene que ser un numero entero',
    required_error: 'El id del entrenador es requerido'
  }),
  details: z.string({
    invalid_type_error: 'El detalle tiene que ser una cadena de texto ',
    required_error: 'El detalle es requerido'
  }),
  id_state: z.number({
    invalid_type_error: 'El id del estado tiene que ser un numero entero',
    required_error: 'El id del estado es requerido'
  }),
});