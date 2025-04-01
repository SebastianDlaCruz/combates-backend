import { IConnection } from "../../lib/interfaces/connection.interface";
import { IGetAll } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";

export interface StateClashes {
  id: number;
  name: string;
}

export class StateClashesModel implements IGetAll {

  private connection: IConnection;

  constructor(connection: IConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection) {
      this.connection.method.release();
    }
  }

  async getAll(): Promise<ResponseRequest> {

    try {
      const [result] = await this.connection.method.query('SELECT * FROM State_Clashes');

      return getStateSuccess({
        data: result
      });

    } catch (error) {

      return getStateError({ error });

    } finally {
      this.release();
    }
  }

}