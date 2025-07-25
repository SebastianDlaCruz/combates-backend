import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { ElementValidator } from "../../lib/utils/element-validator/element-validator";
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
        throw new NotFoundError('Categoría no encontrada', CodeErrors.CATEGORY_NOT_FOUND);
      }

      const [result] = await this.connection.method.query<CategoryQuery[]>('SELECT * FROM Category WHERE id = ?', [id])

      return getStateSuccess({ data: result[0] });

    } catch (error) {


      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al consultar la categoría', CodeErrors.ERROR_GET_CATEGORY);

    } finally {
      this.release();
    }
  }

  async create(data: Category): Promise<ResponseRequest> {

    try {

      const [response] = await this.connection.method.query('INSERT INTO Category SET ?;', [data]);

      if (!response) {
        throw new InternalServerError('Error al crear la categoría', CodeErrors.ERROR_CREATE_CATEGORY);
      }

      return getStateSuccess({
        statusCode: 201
      })

    } catch (error) {

      throw error;


    } finally {
      this.release();
    }
  }

  async update(id: number, data: Category): Promise<ResponseRequest> {
    try {

      const valid = await this.elementValidator.getCategory(id);

      if (!valid) {
        throw new NotFoundError('Categoría no encontrada', CodeErrors.CATEGORY_NOT_FOUND);
      }

      const [result] = await this.connection.method.query('UPDATE  Category SET name = ? , weight = ? WHERE id = ?', [id, data.name, data.weight])


      return getStateSuccess({
        message: 'Categoría modificada'
      })


    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar la categoría', CodeErrors.ERROR_UPDATE_CATEGORY);


    } finally {
      this.release();

    }
  }

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const valid = await this.elementValidator.getCategory(id);


      if (!valid) {
        throw new NotFoundError('Categoría no encontrada', CodeErrors.CATEGORY_NOT_FOUND);
      }

      const [result] = await this.connection.method.query('DELETE FROM Category id = ?', [id]);


      return getStateSuccess({ message: 'Categoría eliminada' });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al eliminar la categoría', CodeErrors.ERROR_DELETE_CATEGORY);

    } finally {
      this.release();
    }
  }


  async getAll(filters?: CategoryFilters): Promise<ResponseRequest> {
    try {

      const [response] = await this.connection.method.query<CategoryQuery[]>('SELECT * FROM Category');

      return getStateSuccess({ data: response })

    } catch (error) {
      throw new InternalServerError('Error al consultar las categorías', CodeErrors.ERROR_GET_CATEGORY);
    }
  }

}