import { RowDataPacket } from "mysql2";
import { ICategory } from "../../lib/interfaces/category.interface";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";

export interface Category {
  id: number;
  name: string;
  weight: number;
}

type CategoryQuery = Category & RowDataPacket;

export class CategoryModel implements ICategory {

  private connection: IConnection;

  constructor(connection: IConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection.method) {
      this.connection.method.release();
    }
  }

  async getCategory(id: number): Promise<ResponseRequest> {
    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        element: 'Category',
        filterBy: 'id',
        value: [id],
      })

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (!valid.response) {
        throw new Error('Categoría no encontrada');
      }

      const [result] = await this.connection.method.query<CategoryQuery[]>('SELECT * FROM Category WHERE id = ?', [id])


      return getStateSuccess({ data: result[0] });

    } catch (error) {
      return getStateError({ error });

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

      return getStateError({ error });

    } finally {
      this.release();
    }
  }
  async update(id: number, data: Category): Promise<ResponseRequest> {
    try {


      const valid = await getValidateElements({
        connection: this.connection.method,
        element: 'Category',
        filterBy: 'id',
        value: [id],
      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (!valid.response) {
        throw new Error('Categoría no encontrada');
      }

      const [result] = await this.connection.method.query('UPDATE  Category SET name = ? , weight = ? WHERE id = ?', [id, data.name, data.weight])

      return getStateSuccess({
        message: 'Categoría modificada'
      })


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
        element: 'Category',
        filterBy: 'id',
        value: [id],
      });
      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (!valid.response) {
        throw new Error('Categoría no encontrada');
      }

      const [result] = await this.connection.method.query('DELETE FROM Category id = ?', [id]);

      return getStateSuccess({ message: 'Categoría eliminada' });

    } catch (error) {
      return getStateError({ error });
    }
  }


  async getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {
    try {


      const [response] = await this.connection.method.query<CategoryQuery[]>('SELECT * FROM Category');

      return getStateSuccess({ data: response })

    } catch (error) {
      return getStateError({ error });
    }
  }

}