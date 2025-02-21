import { IBoxer } from "../../interfaces/boxer.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getConnectionDB } from "../../utils/connection-db.util";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSucces.utilt";
import { getPagination } from "../../utils/pagination.util";
interface QueryResult {
  totalItems: number;
}

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
  corner: string;
  fights: number;
  gender: string
}


export class BoxerModel implements IBoxer {


  async getBoxer(id: string): Promise<ResponseRequest> {

    try {

      const connection = await getConnectionDB();

      const [result] = await connection.query('SELECT * FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      return getStateSuccess({
        data: result
      })

    } catch (error) {

      return getStateError({ error })
    }
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

  async update(id: number, data: Boxer): Promise<ResponseRequest> {

    try {

      const connection = await getConnectionDB();

      const { age, details, disability, id_category, id_coach, id_school, id_state, name, weight, corner, fights, gender } = data;

      const [boxer] = await connection.query('UPDATE Boxer name = ?,id_school = ?,disability = ?,id_category = ?,weight = ?,id_coach = ?,details = ?,id_state= ? ,corner = ? ,fights = ?,gender = ? ,  WHERE id = ? ', [name, id_school, disability, id_category, weight, id_category, id_coach, details, id_state, corner, fights, gender, id]);

      if (!boxer) {
        throw new Error('Error al actualizar el boxeador');
      }

      return {
        statusCode: 200,
        message: 'Éxito',
        success: true,
        data: boxer,

      }
    } catch (error) {

      return getStateError({
        error
      })
    }
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
      return getStateError({
        error
      })
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

      return getStateError({
        error
      })
    }
  }


  async getAll(page: string, pageSize: string): Promise<ResponseRequest> {

    const connection = await getConnectionDB();



    try {

      if (page && pageSize) {


        const pagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          querySelect: 'SELECT BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,id_state FROM Boxer LIMIT ? OFFSET ?;',
          queryItems: 'SELECT COUNT(*) as totalItems FROM Boxer;',
          routerApi: 'api/v1/boxer'
        });


        return {
          statusCode: 200,
          message: 'Existo',
          success: true,
          pagination
        }

      }
      const [boxers] = await connection.query('SELECT  BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,id_state FROM Boxer');

      return {
        statusCode: 200,
        data: boxers,
        success: true,
        message: 'éxito'
      }

    } catch (error) {
      return getStateError({
        error
      })
    }
  }

}