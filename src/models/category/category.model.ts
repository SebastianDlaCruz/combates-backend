import { PoolConnection } from "mysql2/promise";
import { ICrud } from "../../interfaces/crud.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";

export interface Category {
  id: number;
  name: string;
  weight: number;
}
export class CategoryModel implements ICrud<Category> {

  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection) {
      this.connection.release();
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
  delete(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
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