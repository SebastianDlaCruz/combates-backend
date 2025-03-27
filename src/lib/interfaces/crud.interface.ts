import { ResponseRequest } from "./response-request.interface";

export interface ICrud<T> {
  /**
   * Crear un nuevo registro en la base de datos
   * @param data 
   */
  create(data: T): Promise<ResponseRequest>;
  /**
   * Actualiza los datos de un registro en la base de datos
   * @param data 
   */
  update(id: string | number, data: T): Promise<ResponseRequest>;
  /**
   * Elimina un registro de la base de datos
   * @param id 
   */
  delete(id: string | number): Promise<ResponseRequest>;
  /**
   *  Obtiene un registro de la base de datos
   * @param page 
   * @param pageSize 
   */
  getAll(page?: string, pageSize?: string): Promise<ResponseRequest>;
}


/**
   * Actualiza los datos de un registro en la base de datos
   * @param data 
   */
export interface IUpdate<T> {
  update(id: string | number, data: T): Promise<ResponseRequest>;
}

/**
 * Elimina un registro de la base de datos
 * @param id 
 * 
 */

export interface IDelete {
  delete(id: string | number): Promise<ResponseRequest>;
}

export interface ICreate<T> {
  /**
 * Crear un nuevo registro en la base de datos
 * @param data 
 */
  create(data: T): Promise<ResponseRequest>;
}


export interface IGetAll {
  /**
   *  Obtiene un registro de la base de datos
   * @param page 
   * @param pageSize 
   */
  getAll(page?: string, pageSize?: string): Promise<ResponseRequest>;
}

