import { IConnection } from "../../lib/interfaces/connection.interface";
import { ICrud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";

export interface State {
  id: number;
  name: string;
}

export class StateModel implements ICrud<State> {
  private connection: IConnection;

  constructor(connection: IConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection) {
      this.connection.method.release();
    }
  }

  async create(data: State): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.method.query('INSERT INTO State SET ?', [data]);

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

      const [result] = await this.connection.method.query('SELECT * FROM State');

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