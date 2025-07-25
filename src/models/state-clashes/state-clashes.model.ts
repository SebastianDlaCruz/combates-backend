import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getFindOne } from "../../lib/utils/getFindOne/getFindOne.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { StateClashes, StateClashesCrud, StateClashesQuery } from "./state-clashes.interface";


export class StateClashesModel extends ConnectionDB implements StateClashesCrud {



  constructor(connection: IConnection) {
    super(connection);
  }

  create(data: StateClashes): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  update(id: string | number, data: StateClashes): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }



  async getAll(): Promise<ResponseRequest> {

    try {
      const [result] = await this.connection.method.query('SELECT * FROM State_Clashes');

      return getStateSuccess({
        data: result
      });

    } catch (error) {

      throw new InternalServerError('Error al obtener los estados de los enfrentamientos', CodeErrors.ERROR_GET_ALL_STATE_BOXER);

    } finally {
      this.release();
    }
  }


  async getStateClashes(id: number): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({

        connection: this.connection.method,
        element: 'State_Clashes',
        where: [id]

      })

      if (!exist) {
        throw new NotFoundError('Estado de enfrentamiento no encontrado', CodeErrors.ERROR_GET_STATE_CLASHES);
      }

      const [result] = await this.connection.method.query<StateClashesQuery[]>('SELECT * FROM State_Clashes WHERE id = ?', [id]);


      return getStateSuccess({
        data: result[0]
      })

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al obtener el estado del enfrentamiento', CodeErrors.ERROR_GET_STATE_CLASHES);

    } finally {
      this.release();
    }

  }

}