import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getFindOne } from "../../lib/utils/getFindOne/getFindOne.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { Coach, CoachCrud, CoachFilter, CoachQuery } from "./couch.interface";



export class CoachModel extends ConnectionDB implements CoachCrud {


  constructor(connection: IConnection) {
    super(connection);

  }

  async create(data: Coach): Promise<ResponseRequest> {
    try {

      await this.connection.method.query('INSERT INTO Coach SET ?', [data]);

      return getStateSuccess({ statusCode: 201 });

    } catch (error) {

      throw new InternalServerError('Error al crear el coach', CodeErrors.ERROR_CREATE_COACH);

    } finally {
      this.release();
    }
  }

  async update(id: number, data: Coach): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Coach',
        where: ['id'],
      });

      if (!exist) {
        throw new NotFoundError('No se encontró el coach', CodeErrors.COACH_NOT_FOUND);
      }

      const { id_school, name } = data;

      await this.connection.method.query('UPDATE Coach name = ? , id_school = ? WHERE id = ?', [name, id_school, id]);

      return getStateSuccess();

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar el coach', CodeErrors.ERROR_UPDATE_BOXER);

    } finally {
      this.release();
    }

  }

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Coach',
        where: ['id'],
      });

      if (!exist) {
        throw new NotFoundError('No se encontró el coach', CodeErrors.COACH_NOT_FOUND);
      }

      await this.connection.method.query('DELETE FROM Coach WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al eliminar el coach', CodeErrors.ERROR_DELETE_COACH);

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
          throw new InternalServerError('Error al obtener la paginación', CodeErrors.ERROR_PAGINATION_COACH);
        }

        if (responsePagination.success) {

          return getStateSuccess({ pagination: responsePagination.pagination });
        }
      }

      const [result] = await this.connection.method.query('SELECT * FROM Coach');

      return getStateSuccess({ data: result });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al obtener los coaches', CodeErrors.ERROR_GET_ALL_COACH);

    } finally {
      this.release();
    }
  }

  async getCoach(id: number): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Coach',
        where: ['id'],
      });

      if (!exist) {
        throw new NotFoundError('No se encontró el coach', CodeErrors.COACH_NOT_FOUND);
      }

      const [result] = await this.connection.method.query<CoachQuery[]>('SELECT * FROM Coach WHERE id = ?', [id]);

      return getStateSuccess({
        data: result[0]
      })

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al obtener el coach', CodeErrors.ERROR_GET_COACH);

    } finally {
      this.release();
    }
  }

}
