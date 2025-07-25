import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getFindOne } from "../../lib/utils/getFindOne/getFindOne.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { School, SchoolCrud, SchoolFilters, SchoolQuery } from "./school.interface";


export class SchoolModel extends ConnectionDB implements SchoolCrud {


  constructor(connection: IConnection) {
    super(connection);

  }

  async getSchool(id: number): Promise<ResponseRequest> {
    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'School',
        where: ['id'],
      });

      if (!exist) {
        throw new NotFoundError('Escuela no encontrada', CodeErrors.SCHOOL_NOT_FOUND)
      }

      const [result] = await this.connection.method.query<SchoolQuery[]>('SELECT * FROM School WHERE id = ?', [id]);

      return getStateSuccess({ data: result[0] });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;

      }

      throw new InternalServerError('Error al obtener la escuela', CodeErrors.ERROR_GET_SCHOOL);

    } finally {
      this.release();
    }
  }

  async create(data: School): Promise<ResponseRequest> {
    try {

      await this.connection.method.query('INSERT INTO School SET ?', [data]);

      return getStateSuccess();

    } catch (error) {
      throw new InternalServerError('Error al crear la escuela', CodeErrors.ERROR_CREATE_SCHOOL);

    } finally {
      this.release();
    }
  }

  async update(id: number, data: School): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'School',
        where: ['id'],
      });

      if (!exist) {
        throw new NotFoundError('Escuela no encontrada', CodeErrors.SCHOOL_NOT_FOUND);
      }

      await this.connection.method.query('UPDATE School name = ? WHERE id = ?', [data.name, id]);

      return getStateSuccess({ data });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar la escuela', CodeErrors.ERROR_UPDATE_SCHOOL);

    } finally {
      this.release();
    }
  }

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'School',
        where: ['id'],
      });

      if (!exist) {
        throw new NotFoundError('Escuela no encontrada', CodeErrors.SCHOOL_NOT_FOUND);
      }

      await this.connection.method.query('DELETE FROM School WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al eliminar la escuela', CodeErrors.ERROR_DELETE_SCHOOL);

    } finally {
      this.release();
    }

  }

  async getAll(filters?: SchoolFilters): Promise<ResponseRequest> {

    try {

      if (filters && filters.page && filters.pageSize) {

        const { page, pageSize } = filters;

        const responsePagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          connection: this.connection.method,
          queryItems: 'SELECT COUNT(*) AS totalItems FROM School',
          querySelect: 'SELECT * FROM School LIMIT  ? OFFSET ? ;',
          routerApi: 'api/v1/school'
        });


        if (!responsePagination.success) {
          throw new NotFoundError('No se encontraron escuelas', CodeErrors.SCHOOL_NOT_FOUND);
        }

        if (responsePagination.success) {
          return getStateSuccess({ pagination: responsePagination.pagination });
        }

      }

      const [res] = await this.connection.method.query<SchoolQuery[]>('SELECT * FROM School');

      return getStateSuccess({ data: res });


    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al obtener las escuelas', CodeErrors.ERROR_GET_ALL_COACH);

    } finally {
      this.release();
    }


  }

}