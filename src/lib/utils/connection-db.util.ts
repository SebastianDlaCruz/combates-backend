import mysql, { createPool } from 'mysql2/promise';

/**
 * Función que se encarga de establecer la conexión a la base de datos
 * @returns {Promise<mysql.PoolConnection>} Retorna la conexión a la base de datos
 */

const {
  HOST,
  USER,
  PORTDB,
  PASSWORD,
  DATABASE } = process.env;

export const getConnectionDB = async (): Promise<mysql.PoolConnection> => {


  if (!HOST || !USER || !PORTDB || !PASSWORD || !DATABASE) {
    throw new Error('Faltan variables de entorno para la conexión de la base de datos.')
  }


  try {

    const config = {
      host: HOST,
      user: USER,
      port: parseInt(PORTDB),
      password: PASSWORD,
      database: DATABASE,
      connectionLimit: 10,
      queueLimit: 0,
    };

    const pool = createPool(config)
    const connection = await pool.getConnection();

    return connection;

  } catch (error) {
    throw new Error('No se  puedo establecer la conexión a la base de datos')
  }

}