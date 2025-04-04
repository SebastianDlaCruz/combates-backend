import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { IStateClashes } from "../../lib/interfaces/state-clashes.intereface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";

export interface StateClashes {
  id: number;
  name: string;
}

export class StateClashesModel implements IStateClashes {

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

  async getStateClashes(id: number): Promise<ResponseRequest> {

    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM State_Clashes WHERE id = ?',
          value: [id]
        }
      });


      const [result] = await this.connection.method.query('SELECT * FROM State_Clashes WHERE id = ?', [id]);
      const newDate = result as any[];

      return getStateSuccess({
        data: newDate[0]
      })

    } catch (error) {
      return getStateError({ error });

    } finally {
      this.release();
    }

  }

}