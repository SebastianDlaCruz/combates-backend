import mysql, { createPool } from 'mysql2/promise';

import { configDb } from '../config/database.config';
import { InternalServerError } from '../errors/internal-server-error/internal-server.error';
/**
 * Función que se encarga de establecer la conexión a la base de datos
 * @returns {Promise<mysql.PoolConnection>} Retorna la conexión a la base de datos
 */

export const getConnectionDB = async (): Promise<mysql.PoolConnection> => {

  try {
    const pool = createPool(configDb)
    const connection = await pool.getConnection();

    return connection;

  } catch (error) {
    throw new InternalServerError('Error al conectar a la base de datos');
  }

}