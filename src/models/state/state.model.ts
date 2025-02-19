import { ICrud } from "../../interfaces/crud.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getConnectionDB } from "../../utils/connection-db.util";

export interface State {
  id: number;
  name: string;
}

export class StateModel implements ICrud<State> {

  async create(data: State): Promise<ResponseRequest> {

    try {
      const connection = await getConnectionDB();
      const [result] = await connection.query('INSERT INTO State SET ?', [data]);

      if (!result) {
        throw new Error('Error al crear un estado');
      }

      return {
        statusCode: 201,
        message: 'Éxito',
        success: true
      }
    } catch (error) {

      return {
        statusCode: 500,
        message: 'Error',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  update(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [result] = await connection.query('SELECT * FROM State');

      if (!result) {
        throw new Error('Error al consultar los estados');
      }

      return {
        statusCode: 200,
        message: 'Éxito',
        success: true,
        data: result
      }

    } catch (error) {

      return {
        statusCode: 500,
        message: 'Error',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }

    }
  }

}