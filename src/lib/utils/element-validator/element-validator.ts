import { PoolConnection } from "mysql2/promise";
import { BoxerQuery } from "../../../models/boxer/boxer.interface";
import { CategoryQuery } from "../../../models/category/category.interface";
import { InternalServerError } from "../../erros/internal-server-error/internal-server.error";

export class ElementValidator {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  async getBoxer(id: string) {
    try {

      const [response] = await this.connection.query<BoxerQuery[]>('SELECT * FROM Boxer WHERE id =  UUID_TO_BIN(?)', [id]);

      return response.length === 0;

    } catch (error) {
      throw new InternalServerError('Error al consultar al boxeador');
    } finally {
      this.connection.release();
    }
  }

  async getCategory(id: number) {
    try {

      const [response] = await this.connection.query<CategoryQuery[]>('SELECT * FROM Category WHERE id = ?', [id]);
      return response.length === 0;

    } catch (error) {
      throw new InternalServerError('Error al consultar al boxeador');

    } finally {
      this.connection.release();
    }
  }


}