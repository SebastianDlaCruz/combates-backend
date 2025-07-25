import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getFindOne } from "../../lib/utils/getFindOne/getFindOne.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { Clashes, ClashesCrud, ClashesFilters, ClashesQuery } from "./clashes.interface";


export class ClashesModel extends ConnectionDB implements ClashesCrud {

  constructor(connection: IConnection) {
    super(connection);
  }


  async create(data: Clashes): Promise<ResponseRequest> {

    try {

      const { id_category, id_state, id_type_clashes, rounds, number } = data;

      const [result] = await this.connection.method.query(`
        INSERT INTO Clashes (id_category, id_state,id_type_clashes,number,rounds) 
         VALUES (?, ?, ?, ?, ?)`
        , [id_category, id_state, id_type_clashes, number, rounds]);


      return getStateSuccess({
        statusCode: 201,
      })

    } catch (error) {

      throw new InternalServerError('Error al crear el enfrentamiento', CodeErrors.ERROR_CREATE_CLASHES);

    } finally {
      this.release();
    }
  }

  async update(id: number, data: Clashes): Promise<ResponseRequest> {
    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes',
        where: ['id']
      });


      if (!exist) {
        throw new NotFoundError('Enfrentamiento no encontrado', CodeErrors.CLASHES_NOT_FOUND);
      }

      const { id_type_clashes, number, rounds, id_state, id_category } = data;

      await this.connection.method.query('UPDATE Clashes SET id_type_clashes = ? , number_clashes = ?,rounds =?,id_state = ?,id_category = ? WHERE id = ?', [id_type_clashes, number, rounds, id_state, id_category, id]);

      return getStateSuccess();

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar el enfrentamiento', CodeErrors.ERROR_UPDATE_CLASHES);

    } finally {
      this.release();
    }
  }

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes',
        where: ['id']
      });

      if (!exist) {
        throw new NotFoundError('Enfrentamiento no encontrado', CodeErrors.CLASHES_NOT_FOUND);
      }

      await this.connection.method.query('DELETE FROM Clashes WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al eliminar el enfrentamiento', CodeErrors.ERROR_DELETE_CLASHES);
    } finally {
      this.release();
    }
  }

  async getAll(filters?: ClashesFilters): Promise<ResponseRequest> {

    try {

      if (filters && filters.page && filters.pageSize) {

        const { page, pageSize } = filters;

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

        return getStateSuccess({
          pagination: responsePagination.pagination
        })

      }

      const [result] = await this.connection.method.query<ClashesQuery[]>('SELECT * FROM Clashes');

      return getStateSuccess({ data: result });

    } catch (error) {

      throw new InternalServerError('Error al consultar los enfrentamientos', CodeErrors.CLASHES_NOT_FOUND);

    } finally {
      this.release();
    }

  }

  async getClashes(id: number): Promise<ResponseRequest> {
    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes',
        where: ['id']
      });

      if (!exist) {
        throw new NotFoundError('Enfrentamiento no encontrado', CodeErrors.CLASHES_NOT_FOUND);
      }


      const [result] = await this.connection.method.query<ClashesQuery[]>('SELECT * FROM Clashes WHERE id = ?', [id]);


      return getStateSuccess({
        data: result[0],
      })

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al consultar el enfrentamiento', CodeErrors.ERROR_GET_CLASHES);

    } finally {
      this.release();
    }
  }

  async updateState(id: number, id_state: number): Promise<ResponseRequest> {
    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes',
        where: ['id']
      });

      if (!exist) {
        throw new NotFoundError('Enfrentamiento no encontrado', CodeErrors.CLASHES_NOT_FOUND);
      }

      const [result] = await this.connection.method.query('UPDATE Clashes SET id_state= ? WHERE id = ?', [id_state, id]);

      return getStateSuccess({
        data: result
      });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar el estado del enfrentamiento', CodeErrors.ERROR_UPDATE_CLASHES);

    } finally {

      this.release();
    }
  }

}