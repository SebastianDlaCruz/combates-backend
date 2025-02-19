import mysql from 'mysql2/promise';
const {
  HOST,
  USER,
  PORTDB,
  PASSWORD,
  DATABASE } = process.env;

export const getConnectionDB = async (): Promise<mysql.Connection> => {


  if (!HOST || !USER || !PORTDB || !PASSWORD || !DATABASE) {
    throw new Error('Faltan variables de entorno para la conexión de la base de datos.')
  }

  const config = {
    host: HOST || '',
    user: USER || '',
    port: parseInt(PORTDB || '0'),
    password: PASSWORD || '',
    database: DATABASE || ''
  };


  try {

    const connection = await mysql.createConnection(config);

    return connection;

  } catch (error) {
    throw new Error('No se  puedo establecer la conexión a la base de datos')
  }



}