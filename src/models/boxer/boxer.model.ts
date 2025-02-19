import { IBoxer } from "../../interfaces/boxer.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getConnectionDB } from "../../utils/connection-db.util";


export interface Boxer {
  id: string;
  name: string;
  id_school: number;
  age: number;
  disability: string;
  id_category: number;
  weight: number;
  id_coach: number;
  details: string
  id_state: number;
}


export class BoxerModel implements IBoxer {


  getBoxer(id: string): Promise<Boxer> {
    throw new Error("Method not implemented.");
  }

  async create(data: Boxer): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();

      const [result] = await connection.query('INSERT INTO Boxer SET ?', [data]);

      return {
        statusCode: 200,
        success: true,
        message: 'éxito al crear el boxeador'
      }

    } catch (error) {

      return {
        statusCode: 500,
        success: false,
        data: null,
        message: 'error al crear los boxeadores',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }
  update(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  async updateState(id: string, idState: number): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [boxer] = await connection.query('SELECT id FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      if (!boxer) {
        throw new Error('Boxer no encontrado');
      }

      const [state] = await connection.query('UPDATE Boxer SET id_state = ? WHERE id = UUID_TO_BIN(?);', [idState, id]);

      return {
        statusCode: 200,
        success: true,
        message: 'Éxito al actualizar el estado del boxeador'
      }

    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error al actualizar el estado del boxeador',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }


  async delete(id: string): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [result] = await connection.query('SELECT id FROM Boxer WHERE id = UUID_TO_BIN(?);', [id])

      if (!result) {
        return {
          statusCode: 400,
          success: false,
          message: 'Elemento no encontrado'
        }
      }

      await connection.query('DELETE FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      return {
        statusCode: 204,
        success: true,
        message: 'Boxeador eliminado'
      }

    } catch (error) {

      return {
        statusCode: 300,
        message: 'Error al eliminar un Boxeador',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }


  async getAll(): Promise<ResponseRequest> {

    try {
      const connection = await getConnectionDB();
      const [boxers] = await connection.query('SELECT  BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,id_state FROM Boxer');

      return {
        statusCode: 200,
        data: boxers,
        success: true,
        message: 'éxito'
      }

    } catch (err) {
      return {

        statusCode: 500,
        success: false,
        message: 'error al obtener los boxeadores',
        error: err instanceof Error ? err.message : 'Error desconocido'

      }
    }
  }

}