import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getFindOne } from "../../lib/utils/getFindOne/getFindOne.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { StateBoxer, StateBoxerCrud, StateBoxerQuery } from "./state-boxer.interface";

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

      throw new InternalServerError('Error al obtener los estados de los boxeadores', CodeErrors.ERROR_GET_ALL_STATE_BOXER)

    } finally {
      this.release();
    }

  }

  async getStateBoxer(id: number): Promise<ResponseRequest> {
    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'State_Boxer',
        where: [id]
      })


      if (!exist) {
        throw new InternalServerError('Estado de boxeador no encontrado', CodeErrors.BOXER_NOT_FOUND);
      }

      const [result] = await this.connection.method.query<StateBoxerQuery[]>('SELECT * FROM State_Boxer WHERE id = ?', [id]);

      return getStateSuccess({
        data: result[0]
      });

    } catch (error) {

      if (error instanceof InternalServerError) {
        throw error;
      }

      throw new InternalServerError('Error al obtener el estado del boxeador', CodeErrors.ERROR_GET_STATE_BOXER);


    } finally {
      this.release();
    }
  }

}