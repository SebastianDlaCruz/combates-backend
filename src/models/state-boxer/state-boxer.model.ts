import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { IStateBoxer } from "../../lib/interfaces/state-boxer.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";

export interface StateBoxer {
  id: number;
  name: string;
};


export class StateBoxerModel implements IStateBoxer {

  private connection: IConnection;

  constructor(connection: IConnection) {
    this.connection = connection;
  }

  private release() {
    this.connection.method.release();
  };


  async getAll(): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.method.query('SELECT * FROM State_Boxer');

      return getStateSuccess({
        data: result
      });

    } catch (error) {
      return getStateError({ error });
    } finally {
      this.release();
    }

  }

  async getStateBoxer(id: number): Promise<ResponseRequest> {
    try {
      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM State_Boxer WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }


      if (!valid.response) {
        throw new Error('Estado del boxeador no encontrado');
      }

      const [result] = await this.connection.method.query('SELECT * FROM State_Boxer WHERE id = ?', [id]);
      const newDate = result as any[];

      return getStateSuccess({
        data: newDate[0]
      });

    } catch (error) {
      return getStateError({ error });
    } finally {
      this.release();
    }
  }

}