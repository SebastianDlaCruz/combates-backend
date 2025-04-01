import { IClashes } from "../../lib/interfaces/clashes.interface";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";
import { groupDataClashes } from "./util/group-data-clashes.util";



export interface Clashes {
  id: number;
  number: number;
  id_type_clashes: number;
  rounds: number;
  id_category: number;
  id_state: string;
}


export class ClashesModel implements IClashes {
  private connection: IConnection;
  constructor(connection: IConnection) {
    this.connection = connection;

  }

  private release() {
    if (this.connection) {
      this.connection.method.release();
    }
  }

  async create(data: Clashes): Promise<ResponseRequest> {

    try {


      const { id_category, id_state, id_type_clashes, rounds, number } = data;

      console.log(data);

      const [result] = await this.connection.method.query(`
        INSERT INTO Clashes (id_category, id_state,id_type_clashes,number_clashes,rounds) 
         VALUES (?, ?, ?, ?, ?)`
        , [id_category, id_state, id_type_clashes, number, rounds]);

      if (!result) {
        throw new Error('Error al crear el enfrentamiento');
      }

      return getStateSuccess({
        statusCode: 201,
      })

    } catch (error) {
      return getStateError({ error });
    } finally {
      this.release();
    }
  }

  async update(id: number, data: Clashes): Promise<ResponseRequest> {
    try {

      const { id_type_clashes, number, rounds, id_state, id_category } = data;

      const [result] = await this.connection.method.query('UPDATE Clashes SET id_type_clashes = ? , number_clashes = ?,rounds =?,id_state = ?,id_category = ? WHERE id = ?', [id_type_clashes, number, rounds, id_state, id_category, id]);

      if (!result) {
        throw new Error('Error al actualizar el enfrentamiento');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({ error });
    } finally {
      this.release();
    }
  }

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Clashes WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error('Error al buscar el enfrentamiento');
      }

      if (valid.response) {
        throw new Error('Error enfrentamiento no encontrado');
      }

      await this.connection.method.query('DELETE FROM Clashes WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {
      return getStateError({ error });

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
          querySelect: `SELECT * FROM Clashes`,
          queryItems: 'SELECT COUNT(*) as totalItems FROM Clashes;',
          routerApi: '/api/v1/clashes',
          connection: this.connection.method
        })

        if (!responsePagination.success) {
          throw new Error('Error al consultar los combates');
        }

        const dataPagination = responsePagination.pagination.data as any[];

        const data = groupDataClashes(dataPagination);

        responsePagination.pagination.data = data;

        return getStateSuccess({
          pagination: responsePagination.pagination
        })

      }

      const [result] = await this.connection.method.query('SELECT * FROM Clashes');



      return getStateSuccess({ data: result });

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }

  }

  async getClashes(id: number): Promise<ResponseRequest> {
    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Clashes WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error('Error al consultar un enfrentamiento');
      }

      if (valid.response) {
        throw new Error('Error enfrentamiento no encontrado');
      }

      const [result] = await this.connection.method.query('SELECT * FROM Clashes WHERE id = ?', [id]);


      return getStateSuccess({
        data: result,
      })

    } catch (error) {
      return getStateError({ error })
    } finally {
      this.release();
    }
  }

  async updateState(id: number, id_state: number): Promise<ResponseRequest> {
    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Clashes WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error('Error al consultar un enfrentamiento');
      }

      if (valid.response) {
        throw new Error('Error enfrentamiento no encontrado');
      }

      const [result] = await this.connection.method.query('UPDATE Clashes SET id_state= ? WHERE id = ?', [id_state, id]);
      if (!result) {
        throw new Error('Error actualizar el estado');
      }

      return getStateSuccess({
        data: result
      });

    } catch (error) {
      return getStateError({ error });

    } finally {

      this.release();
    }
  }

}