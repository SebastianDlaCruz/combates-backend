import { ConnectionDB } from "../../lib/config/connection-db.config";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { ElementValidator } from "../../lib/utils/element-validator/element-validator";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { Category, CategoryCrud, CategoryFilters, CategoryQuery } from "./category.interface";


export class CategoryModel extends ConnectionDB implements CategoryCrud {

  private elementValidator: ElementValidator;
  constructor(connection: IConnection) {
    super(connection);
    this.elementValidator = new ElementValidator(connection.method);
  }

  async getCategory(id: number): Promise<ResponseRequest> {
    try {

      const valid = await this.elementValidator.getCategory(id);


      if (!valid) {
        throw new NotFoundError('Categoría no encontrada');
      }

      const [result] = await this.connection.method.query<CategoryQuery[]>('SELECT * FROM Category WHERE id = ?', [id])

      if (!result) {
        throw new InternalServerError('Error al consultar la categoría');
      }
      return getStateSuccess({ data: result[0] });

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

  async create(data: Category): Promise<ResponseRequest> {

    try {

      const [response] = await this.connection.method.query('INSERT INTO Category SET ?;', [data]);

      if (!response) {
        throw new Error('Error al crear una categoría');
      }

      return getStateSuccess({
        statusCode: 201
      })

    } catch (error) {

      const err = error instanceof Error ? error.message : '';


      throw new InternalServerError(err);


    } finally {
      this.release();
    }
  }

  async update(id: number, data: Category): Promise<ResponseRequest> {
    try {


      const [response] = await this.connection.method.query('INSERT INTO Category SET ?;', [data]);

      if (!response) {
        throw new Error('Error al crear una categoría');
      }

      const [result] = await this.connection.method.query('UPDATE  Category SET name = ? , weight = ? WHERE id = ?', [id, data.name, data.weight])

      if (!result) {
        throw new InternalServerError('Error al modificar la categoría');
      }
      return getStateSuccess({
        message: 'Categoría modificada'
      })


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

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getCategory(id);


      if (!valid) {
        throw new NotFoundError('Categoría no encontrada');
      }

      const [result] = await this.connection.method.query('DELETE FROM Category id = ?', [id]);

      if (!result) {
        throw new InternalServerError('Error al eliminar la categoría');
      }

      return getStateSuccess({ message: 'Categoría eliminada' });

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


  async getAll(filters?: CategoryFilters): Promise<ResponseRequest> {
    try {


      const [response] = await this.connection.method.query<CategoryQuery[]>('SELECT * FROM Category');

      return getStateSuccess({ data: response })

    } catch (error) {
      return getStateError({ error });
    }
  }

}