import { getStateSuccess } from "../../lib//utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib//utils/pagination/pagination.util";
import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { ElementValidator } from "../../lib/utils/element-validator/element-validator";
import { Boxer, BoxerCrud, BoxerFilters, BoxerQuery } from "./boxer.interface";

export class BoxerModel extends ConnectionDB implements BoxerCrud {


  private elementValidator: ElementValidator;

  constructor(connection: IConnection) {
    super(connection);
    this.elementValidator = new ElementValidator(this.connection.method);
  }

  async updateCorner(id: string, body: { corner: string; }): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getBoxer(id);

      if (valid) {
        throw new NotFoundError('Boxeador no encontrado', CodeErrors.BOXER_NOT_FOUND);
      }

      const [response] = await this.connection.method.query('UPDATE Boxer SET corner = ? WHERE id = UUID_TO_BIN(?)', [body.corner, id]);

      return getStateSuccess({ message: 'éxito al actualizar la esquina  del boxeador' });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar la esquina del boxeador', CodeErrors.ERROR_UPDATE_CORNER_BOXER);

    } finally {
      this.release();
    }
  }


  async getBoxer(id: string): Promise<ResponseRequest | InternalServerError | NotFoundError> {


    try {

      const valid = await this.elementValidator.getBoxer(id);

      if (valid) {
        throw new NotFoundError('Boxeador no encontrado', CodeErrors.BOXER_NOT_FOUND);
      }

      const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id =  UUID_TO_BIN(?);', [id]);


      return getStateSuccess({
        data: result[0]
      })


    } catch (error) {


      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al obtener el boxeador');

    } finally {
      this.release();
    }
  }

  async create(data: Boxer): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('INSERT INTO Boxer SET ?', [data]);

      if (!result) {
        throw new InternalServerError('Error al crear el boxeador', CodeErrors.ERROR_CREATE_BOXER);
      }

      return getStateSuccess({
        statusCode: 201,
        message: 'éxito al crear el boxeador'
      })

    } catch (error) {

      throw error;

    } finally {
      this.release();
    }
  }

  async update(id: string, data: Boxer): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getBoxer(id);

      if (valid) {

        throw new NotFoundError('Boxeador no encontrado', CodeErrors.BOXER_NOT_FOUND);
      }

      const { age, details, disability, id_category, id_coach, id_school, id_state, name, weight, corner, fights, gender } = data;

      const [boxer] = await this.connection.method.query(`UPDATE Boxer
        SET 
         name = ?,
         id_school = ?,
         disability = ?,
         id_category = ?,
         weight = ?,
         id_coach = ?,
         details = ?,
         id_state = ?,
         corner = ? ,
         fights = ?,
         gender = ?, 
         age = ?
          WHERE 
        id = UUID_TO_BIN(?);`, [name, id_school, disability, id_category, weight, id_coach, details, id_state, corner, fights, gender, age, id]);

      return getStateSuccess({ message: 'éxito al actualizar el boxeador' });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar el boxeador');

    } finally {
      this.release();
    }
  }

  async updateState(id: string, idState: { state: number }): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getBoxer(id);

      if (valid) {
        throw new NotFoundError('Boxeador no encontrado', CodeErrors.BOXER_NOT_FOUND);
      }

      await this.connection.method.query('UPDATE Boxer SET id_state = ? WHERE id = UUID_TO_BIN(?);', [idState.state, id]);

      return getStateSuccess({ message: 'éxito al actualizar el estado del boxeador' });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar el estado del boxeador', CodeErrors.ERROR_UPDATE_BOXER);

    } finally {
      this.release();
    }
  }


  async delete(id: string): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getBoxer(id);


      if (valid) {
        throw new NotFoundError('Boxeador no encontrado', CodeErrors.BOXER_NOT_FOUND);
      }

      await this.connection.method.query('DELETE FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      return getStateSuccess({ message: 'Boxeador eliminado' });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al eliminar el boxeador', CodeErrors.ERROR_DELETE_BOXER);

    } finally {
      this.release();
    }
  }

  async getByCategory(id_category: number): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.method.query('SELECT  BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ? ', [id_category]);

      if (!result) {
        throw new InternalServerError('Error al obtener los boxeadores por categoría', CodeErrors.ERROR_GET_BY_CATEGORY_BOXER);
      }

      return getStateSuccess({
        data: result
      });

    } catch (error) {

      throw error;

    } finally {
      this.release();
    }
  }

  async getAll(filters?: BoxerFilters): Promise<ResponseRequest> {

    try {

      if (filters && filters.page && filters.pageSize) {

        const { page, pageSize } = filters;

        const responsePagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          querySelect: 'SELECT BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer LIMIT ? OFFSET ?;',
          queryItems: 'SELECT COUNT(*) as totalItems FROM Boxer;',
          routerApi: 'api/v1/boxer',
          connection: this.connection.method
        });

        if (!responsePagination.success) {
          throw new InternalServerError('Error al obtener la paginación de los boxeadores', CodeErrors.ERROR_PAGINATION_BOXER);
        }

        if (responsePagination.success) {
          return getStateSuccess({
            pagination: responsePagination.pagination
          });
        }

      }


      const [boxers] = await this.connection.method.query<BoxerQuery[]>(`
        SELECT  BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer`);

      if (!boxers) {
        throw new InternalServerError('Error al obtener los boxeadores', CodeErrors.BOXER_NOT_FOUND);
      }


      return getStateSuccess({
        data: boxers
      });

    } catch (error) {
      throw error;

    } finally {
      this.release();
    }
  }

  async search(boxer: Partial<Boxer>): Promise<ResponseRequest> {

    const { id_category, name } = boxer;


    try {

      if (name && name !== '') {

        const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE name LIKE ?', [`%${name}%`])


        return getStateSuccess({ data: result });
      }


      if (id_category) {

        const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ?', [id_category])

        return getStateSuccess({ data: result });
      }

      if ((id_category && id_category > 0) && (name && name?.length > 0)) {


        const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ? AND name LIKE ?;', [id_category, `%${name}%`])

        return getStateSuccess({ data: result });
      }

      return getStateSuccess({ data: [] });

    } catch (error) {

      throw new InternalServerError('Error al buscar el boxeador', CodeErrors.ERROR_SEARCH_BOXER);

    } finally {
      this.release();
    }

  }

}