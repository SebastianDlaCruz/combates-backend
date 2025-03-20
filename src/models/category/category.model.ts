import { PoolConnection } from "mysql2/promise";
import { ICategory } from "../../interfaces/category.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSuccess.util.ts/getStateSuccess.util";

export interface Category {
  id: number;
  name: string;
  weight: number;
}

export class CategoryModel implements ICategory {

  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection) {
      this.connection.release();
    }
  }

  async getCategory(id: number): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.query('SELECT * FROM Category WHERE id = ?', [id])

      if (!result) {
        throw new Error('Category no encontrada');
      }

      const value = result as Category[];
      const [category] = value

      return getStateSuccess({ data: category });

    } catch (error) {
      return getStateError({ error });
    } finally {
      this.release();
    }
  }

  async create(data: Category): Promise<ResponseRequest> {

    try {

      const [response] = await this.connection.query('INSERT INTO Category SET ?;', [data]);
      if (!response) {
        throw new Error('Error al crear una categoría');
      }
      return {
        statusCode: 201,
        message: 'Éxito',
        success: true
      }

    } catch (error) {

      return {
        statusCode: 500,
        success: false,
        message: 'Error',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    } finally {
      this.release();
    }
  }
  async update(id: number, data: Category): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.query('UPDATE  Category SET name = ? , weight = ? WHERE id = ?', [id, data.name, data.weight])

      if (!result) {
        throw new Error('Categoría no encontrada');
      }

      return {
        statusCode: 200,
        success: true,
        message: 'Categoría modificada'
      }

    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  async delete(id: number): Promise<ResponseRequest> {

    try {

      const [found] = await this.connection.query('SELECT * FROM  Category WHITE id  =  ? ', [id]);

      if (!found) {
        throw new Error('Categoria no encontrada');
      }

      const [result] = await this.connection.query('DELETE FROM Category id = ?', [id]);

      return getStateSuccess({ message: 'Categoría eliminada' });

    } catch (error) {
      return getStateError({ error });
    }
  }


  async getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {
    try {


      const [response] = await this.connection.query('SELECT * FROM Category');

      if (!response) {
        throw new Error('Error al consultar las categorías');

      }

      return {
        statusCode: 200,
        data: response,
        message: 'Existo',
        success: true,
      }

    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

}