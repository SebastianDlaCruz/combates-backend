import { PoolConnection } from "mysql2/promise";


interface Query {
  sql: string;
  value: unknown[];
}

interface Params {
  connection: PoolConnection,
  element?: string;
  value?: unknown[];
  query?: Query;
  filterBy?: string;

};

/**
 *  Valida si el elemento a consultar existe en la tabla.
 * Especificando : 
 *  - Elements como el elemento a consultar (nombre de la tabla).
 *  - filterBy como la propiedad por cual queres consultar.
 *  - value como el valor de la consulta.
 * 
 * También podes ser mas especifico con la consulta  con las propiedades como :
 * 
 *  - sql  consulta en formato sql 
 *  - value com el valor por el cual lo va a consultar 
 * 
 * @param params 
 * @returns {ok:boolean,response:any}  ok si la consulta fue exitosa y response la respuesta de la consulta 
 */

interface Response {
  ok: boolean;
  response: boolean;
  message?: string;
}

export const getValidateElements = async (params: Params): Promise<Response> => {


  try {

    let data: any[] = [];

    if (params.query) {

      const [result] = await params.connection.query(params.query.sql, params.query.value);
      const mewData = result as any[];
      data = mewData;
    }

    if (params.element && params.value && params.filterBy) {

      const [result] = await params.connection.query(`SELECT * FROM ${params.element} WHERE ${params.filterBy} = ?`, params.value);

      data = result as any[];

    }

    return {
      ok: true,
      response: data.length !== 0
    };


  } catch (error) {
    return {
      ok: false,
      response: false,
      message: error instanceof Error ? error.message : 'Mensaje desconocido'
    };
  }

}