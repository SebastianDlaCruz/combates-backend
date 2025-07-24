import { ConnectionDB } from "../../lib/config/connection-db.config";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";
import { Coach, CoachCrud, CoachFilter } from "./couch.interface";



export class CoachModel extends ConnectionDB implements CoachCrud {


  constructor(connection: IConnection) {
    super(connection);

  }

  async create(data: Coach): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('INSERT INTO Coach SET ?', [data]);
      if (!result) {
        throw new Error('Error al crear un entrenador')
      }
      return getStateSuccess({ statusCode: 201 });

    } catch (error) {
      return getStateError({ error });

    } finally {
      this.release();
    }
  }

  async update(id: number, data: Coach): Promise<ResponseRequest> {

    try {

      const [found] = await this.connection.method.query('SELECT * FROM Coach WHERE id = ? ', [id]);

      if (!found) {
        throw new Error('No se encontró el profesor');
      }

      const { id_school, name } = data;

      await this.connection.method.query('UPDATE Coach name = ? , id_school = ? WHERE id = ?', [name, id_school, id]);

      return getStateSuccess();

    } catch (error) {

      return getStateError({ error });

    } finally {
      this.release();
    }

  }

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const [found] = await this.connection.method.query('SELECT * FROM Coach WHERE id = ? ', [id]);

      if (!found) {
        throw new Error('No se encontró el profesor');
      }

      await this.connection.method.query('DELETE FROM Coach WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {

      return getStateError({ error });
    } finally {
      this.release();
    }

  }

  async getAll(filters?: CoachFilter): Promise<ResponseRequest> {

    try {

      if (filters && filters.page && filters.pageSize) {
        const { page, pageSize } = filters;

        const responsePagination = await getPagination({
          connection: this.connection.method,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          queryItems: 'SELECT * FROM Coach LIMIT ? OFFSET ?;',
          querySelect: 'SELECT COUNT(*) as totalItems FROM Boxer;',
          routerApi: 'api/v1/coach'
        });

        if (!responsePagination.success) {
          throw new Error('Error al devolver la paginacion de los boxeadores');
        }

        if (responsePagination.success) {

          return getStateSuccess({ pagination: responsePagination.pagination });
        }
      }

      const [result] = await this.connection.method.query('SELECT * FROM Coach');
      return getStateSuccess({ data: result });
    } catch (error) {
      return getStateError({ error });

    } finally {
      this.release();
    }
  }

  async getCoach(id: number): Promise<ResponseRequest> {

    try {
      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Coach WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (!valid.response) {
        throw new Error('Error al consultar el coach');
      }

      const [result] = await this.connection.method.query('SELECT * FROM Coach WHERE id = ?', [id]);
      const newData = result as any[];

      return getStateSuccess({
        data: newData[0]
      })

    } catch (error) {
      return getStateError({ error });

    } finally {
      this.release();
    }
  }

}
