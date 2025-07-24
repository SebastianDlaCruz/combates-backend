import { ConnectionDB } from "../../lib/config/connection-db.config";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";
import { StateBoxer, StateBoxerCrud } from "./state-boxer.interface";

export class StateBoxerModel extends ConnectionDB implements StateBoxerCrud {


  constructor(connection: IConnection) {
    super(connection);
  }


  create(data: StateBoxer): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  update(id: string | number, data: StateBoxer): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }



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