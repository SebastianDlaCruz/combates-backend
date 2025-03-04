import { PoolConnection } from "mysql2/promise";
import { ICrud } from "../../interfaces/crud.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSuccess.util";

export interface State {
  id: number;
  name: string;
}

export class StateModel implements ICrud<State> {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection) {
      this.connection.release();
    }
  }

  async create(data: State): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.query('INSERT INTO State SET ?', [data]);

      if (!result) {
        throw new Error('Error al crear un estado');
      }

      return getStateSuccess({ statusCode: 201 });

    } catch (error) {

      return getStateError({ error })
    } finally {
      this.release();
    }
  }

  update(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.query('SELECT * FROM State');

      if (!result) {
        throw new Error('Error al consultar los estados');
      }


      return getStateSuccess({ data: result });

    } catch (error) {

      return getStateError({ error });

    } finally {
      this.release();
    }

  }

}