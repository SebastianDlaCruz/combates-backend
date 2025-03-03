import { PoolConnection } from "mysql2/promise";
import { IBoxer } from "../../interfaces/boxer.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSuccess.util";
import { getPagination } from "../../utils/pagination/pagination.util";
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

  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection) {
      this.connection.release();
    }
  }

  async getBoxer(id: string): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.query('SELECT * FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      return getStateSuccess({
        data: result
      })

    } catch (error) {

      return getStateError({ error })
    } finally {
      this.release();
    }
  }

  async create(data: Boxer): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.query('INSERT INTO Boxer SET ?', [data]);

      if (!result) {
        throw new Error('Error al crear  boxeador')
      }


      return getStateSuccess({
        statusCode: 201,
        message: 'éxito al crear el boxeador'
      })

    } catch (error) {

      return getStateError({ error });
    } finally {
      this.release();
    }
  }

  async update(id: string, data: Boxer): Promise<ResponseRequest> {

    try {

      const { age, details, disability, id_category, id_coach, id_school, id_state, name, weight, corner, fights, gender } = data;

      const [boxer] = await this.connection.query('UPDATE Boxer name = ?,id_school = ?,disability = ?,id_category = ?,weight = ?,id_coach = ?,details = ?,id_state= ? ,corner = ? ,fights = ?,gender = ? , age = ?  WHERE id = ? ', [name, id_school, disability, id_category, weight, id_category, id_coach, details, id_state, corner, fights, gender, age, id]);

      if (!boxer) {
        throw new Error('Error al actualizar el boxeador');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }

  async updateState(id: string, idState: number): Promise<ResponseRequest> {
    try {


      const [state] = await this.connection.query('UPDATE Boxer SET id_state = ? WHERE id = UUID_TO_BIN(?);', [idState, id]);

      if (!state) {
        throw new Error('Error al actualizar el estado');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }


  async delete(id: string): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.query('SELECT id FROM Boxer WHERE id = UUID_TO_BIN(?);', [id])

      if (!result) {
        getStateError({
          statusCode: 400,
          message: 'Elemento no encontrado'
        });
      }

      await this.connection.query('DELETE FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);


      return getStateSuccess({ statusCode: 204, message: 'Boxeador eliminado' });


    } catch (error) {

      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }

  async getByCategory(id_category: number): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.query('SELECT SELECT BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,id_state FROM Boxer WHERE id_category = ? ', [id_category]);

      if (!result) {
        throw new Error('Erro al encontrar boxeador por su categoría');
      }

      return getStateSuccess({
        data: result
      });

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }

  async getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {

    try {

      if (page && pageSize) {

        const responsePagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          querySelect: 'SELECT BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,id_state FROM Boxer LIMIT ? OFFSET ?;',
          queryItems: 'SELECT COUNT(*) as totalItems FROM Boxer;',
          routerApi: 'api/v1/boxer',
          connection: this.connection
        });

        if (!responsePagination.success) {
          throw new Error('Error al devolver la paginacion de los boxeadores');
        }

        if (responsePagination.success) {
          return getStateSuccess({
            pagination: responsePagination.pagination
          });
        }

      }



      const [boxers] = await this.connection.query('SELECT  BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,id_state FROM Boxer');

      if (!boxers) {
        throw new Error('Error al consultar los boxeadores');
      }

      return getStateSuccess({
        data: boxers
      });

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }


}