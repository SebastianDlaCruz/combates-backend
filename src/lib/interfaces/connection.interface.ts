import { PoolConnection } from "mysql2/promise";

/** 
 * Interface que define el metodo de la conexión a la base de datos.
 */
export interface IConnection {
  method: PoolConnection
} 