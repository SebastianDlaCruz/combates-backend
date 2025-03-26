import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { ISchool } from "../../lib/interfaces/school.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";

export interface School {
  id: number;
  name: string
}

export class SchoolModel implements ISchool {

  private connection: IConnection;

  constructor(connection: IConnection) {
    this.connection = connection;

  }

  private release() {
    if (this.connection) {
      this.connection.method.release();
    }
  }

  async getSchool(id: number): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('SELECT * FROM School WHERE id = ?', [id]);

      if (!result) {
        throw new Error('Escuela no encontrada');
      }

      return getStateSuccess({ data: result });

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }

  async create(data: School): Promise<ResponseRequest> {
    try {

      const [res] = await this.connection.method.query('INSERT INTO School SET ?', [data]);

      if (!res) {
        throw new Error('Error al crear');
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

  async update(id: number, data: School): Promise<ResponseRequest> {

    try {

      const [res] = await this.connection.method.query('UPDATE School name = ? WHERE id = ?', [data.name, id]);

      if (!res) {
        throw new Error('Error al actualizar la escuela')
      }

      return getStateSuccess({ data });

    } catch (error) {
      const result = getStateError({
        error
      });
      return result;
    } finally {
      this.release();
    }
  }

  async delete(id: number): Promise<ResponseRequest> {
    try {

      const [res] = await this.connection.method.query('DELETE FROM School WHERE id = ?', [id]);

      if (!res) {
        throw new Error('Error al eliminar una escuela');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error
      });
    }
  }

  async getAll(page: string, pageSize: string): Promise<ResponseRequest> {

    try {

      if (page && pageSize) {

        const responsePagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          connection: this.connection.method,
          queryItems: 'SELECT COUNT(*) AS totalItems FROM School',
          querySelect: 'SELECT * FROM School LIMIT  ? OFFSET ? ;',
          routerApi: 'api/v1/school'
        });

        if (!responsePagination.success) {
          throw new Error('Error de la pagination');
        }

        if (responsePagination.success) {
          return getStateSuccess({ pagination: responsePagination.pagination });
        }

      }

      const [res] = await this.connection.method.query('SELECT * FROM School');

      if (!res) {
        throw new Error('Error al consultar');
      }

      return getStateSuccess({ data: res });


    } catch (error) {

      return getStateError({
        error
      })
    }
  }

}