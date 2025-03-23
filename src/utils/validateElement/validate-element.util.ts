import { PoolConnection } from "mysql2/promise";


interface Query {
  sql: string;
  value: unknown[];
}

interface Params {
  connection: PoolConnection,
  element?: string;
  query?: Query;

};

/**
 *  Valida si el elemento seleccionado se encuentra en la base de datos
 * @param params 
 * @returns {ok:boolean,response:any[]}  ok si la consulta fue exitosa y response la respuesta de la consulta 
 */

export const getValidateElements = async (params: Params) => {


  try {

    let data: any[] = [];

    if (params.query) {

      const [result] = await params.connection.query(params.query.sql, params.query.value);

      data = result as any[];
    }

    if (params.element) {

      const [result] = await params.connection.query(`SELECT * FROM ${params.element}`);

      data = result as any[];

    }


    return {
      ok: true,
      response: data.length > 0
    };


  } catch (error) {
    return {
      ok: false,
      response: false,
      message: error instanceof Error ? error.message : 'Mensaje desconocido'
    };
  }

}