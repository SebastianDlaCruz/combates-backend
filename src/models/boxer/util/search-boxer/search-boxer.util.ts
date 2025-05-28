import { PoolConnection } from "mysql2/promise";
import { InternalServerError } from "../../../../lib/erros/internal-server-error/internal-server.error";
import { BoxerQuery } from "../../type";

export class SearchBoxer {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  async getId(id: string) {
    try {

      const [response] = await this.connection.query<BoxerQuery[]>('SELECT * FROM Boxer WHERE id =  UUID_TO_BIN(?)', [id]);

      return response.length === 0;

    } catch (error) {
      throw new InternalServerError('Error al consultar al boxeador');
    } finally {
      this.connection.release();
    }
  }


}