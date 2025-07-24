import { getStateSuccess } from "../../lib//utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib//utils/pagination/pagination.util";
import { ConnectionDB } from "../../lib/config/connection-db.config";
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
        throw new NotFoundError('Boxeador no encontrado');
      }

      const [response] = await this.connection.method.query('UPDATE Boxer SET corner = ? WHERE id = UUID_TO_BIN(?)', [body.corner, id]);

      if (!response) {
        throw new Error('Error al actualizar la esquina del boxeador');
      }

      return getStateSuccess({ message: 'éxito al actualizar la esquina  del boxeador' });


    } catch (error) {

      const messageError = error instanceof Error ? error.message : '';

      if (error instanceof NotFoundError) {
        throw new NotFoundError(messageError);
      }

      throw new InternalServerError(messageError);


    } finally {
      this.release();
    }
  }


  async getBoxer(id: string): Promise<ResponseRequest | InternalServerError | NotFoundError> {


    try {

      const valid = await this.elementValidator.getBoxer(id);

      if (valid) {
        throw new NotFoundError('Boxeador no encontrado');
      }

      const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id =  UUID_TO_BIN(?);', [id]);

      if (!result) {
        throw new Error('Error desconocido al obtener el boxeador');
      }

      return getStateSuccess({
        data: result[0]
      })


    } catch (error) {

      const messageError = error instanceof Error ? error.message : '';

      if (error instanceof NotFoundError) {
        throw new NotFoundError(messageError);
      }


      throw new InternalServerError(messageError);



    } finally {
      this.release();
    }
  }

  async create(data: Boxer): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('INSERT INTO Boxer SET ?', [data]);

      if (!result) {
        throw new Error('Error al crear el boxeador');
      }

      return getStateSuccess({
        statusCode: 201,
        message: 'éxito al crear el boxeador'
      })

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '';
      throw new InternalServerError(errorMessage)

    } finally {
      this.release();
    }
  }

  async update(id: string, data: Boxer): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getBoxer(id);

      if (valid) {

        throw new NotFoundError('Boxeador no encontrado');
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


      if (boxer) {
        throw new Error('Error al actualizar el boxeador');
      }

      return getStateSuccess({ message: 'éxito al actualizar el boxeador' });

    } catch (error) {
      const err = error instanceof Error ? error.message : '';
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new InternalServerError(err);
    } finally {
      this.release();
    }
  }

  async updateState(id: string, idState: { state: number }): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getBoxer(id);

      if (valid) {
        throw new NotFoundError('Boxeador no encontrado');
      }

      const [state] = await this.connection.method.query('UPDATE Boxer SET id_state = ? WHERE id = UUID_TO_BIN(?);', [idState.state, id]);

      if (!state) {
        throw new Error('Error al actualizar el estado del boxeador');
      }

      return getStateSuccess({ message: 'éxito al actualizar el estado del boxeador' });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }

      throw new InternalServerError(error instanceof Error ? error.message : '');

    } finally {
      this.release();
    }
  }


  async delete(id: string): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getBoxer(id);


      if (valid) {
        throw new NotFoundError('Boxeador no encontrado');
      }

      await this.connection.method.query('DELETE FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      return getStateSuccess({ message: 'Boxeador eliminado' });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }

      throw new InternalServerError(error instanceof Error ? error.message : 'Error desconocido al eliminar el boxeador');

    } finally {
      this.release();
    }
  }

  async getByCategory(id_category: number): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.method.query('SELECT  BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ? ', [id_category]);

      if (!result) {
        throw new Error('Error al buscar a los boxeadores por categoría');
      }

      return getStateSuccess({
        data: result
      });

    } catch (error) {

      throw new InternalServerError(error instanceof Error ? error.message : '');

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
          throw new Error('Error al devolver la paginacion de los boxeadores');
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
        throw new Error('Error al obtener los boxeadores');;
      }


      return getStateSuccess({
        data: boxers
      });

    } catch (error) {


      throw new InternalServerError(error instanceof Error ? error.message : '');

    } finally {
      this.release();
    }
  }

  async search(boxer: Partial<Boxer>): Promise<ResponseRequest> {

    const { id_category, name } = boxer;


    try {

      if (name && name !== '') {

        const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE name LIKE ?', [`%${name}%`])

        if (!result) {
          throw new Error('Error al buscar el boxeador por nombre');
        }

        return getStateSuccess({ data: result });
      }


      if (id_category) {

        const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ?', [id_category])


        if (!result) {
          throw new Error('Error al buscar el por categoría');
        }

        return getStateSuccess({ data: result });
      }

      if ((id_category && id_category > 0) && (name && name?.length > 0)) {


        const [result] = await this.connection.method.query<BoxerQuery[]>('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ? AND name LIKE ?;', [id_category, `%${name}%`])


        if (!result) {
          throw new Error('Error al buscar el boxeador por nombre y categoría');
        }
        return getStateSuccess({ data: result });
      }

      return getStateSuccess({ data: [] });

    } catch (error) {

      throw new InternalServerError(error instanceof Error ? error.message : '');

    } finally {
      this.release();
    }

  }

}