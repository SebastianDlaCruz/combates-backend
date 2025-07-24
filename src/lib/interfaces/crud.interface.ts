import { ResponseRequest } from "./response-request.interface";

/**
 * Interfaz para crear, actualizar, eliminar y obtener todos los registros de la base de datos
 * @template T El tipo de dato que se va a crear, actualizar, eliminar y obtener
 * @template F El tipo de dato que se va a filtrar
 * 
 */

export interface Crud<T, F = any> {

  create(data: T): Promise<ResponseRequest>;

  update(id: string | number, data: T): Promise<ResponseRequest>;

  delete(id: string | number): Promise<ResponseRequest>;

  getAll(filters?: F): Promise<ResponseRequest>;
}

