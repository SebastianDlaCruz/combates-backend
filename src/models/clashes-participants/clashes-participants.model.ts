import { PoolConnection } from "mysql2/promise";
import { IClashesParticipants } from "../../interfaces/clashes-participants.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../utils/validateElement/validate-element.util";

export interface ClashesParticipants {
  id: number;
  id_boxer: string;
  id_clashes: number;
}

export class ClashesParticipantsModel implements IClashesParticipants {

  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  delete(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  private release() {
    this.connection.release();
  };



  async create(data: ClashesParticipants): Promise<ResponseRequest> {

    try {

      await this.connection.query('INSERT INTO clashes_participants SET ?', [data]);

      return getStateSuccess({
        statusCode: 201
      });

    } catch (error) {

      return getStateError({ error })
    } finally {

      this.release();
    }

  };

  async update(id: string | number, data: ClashesParticipants): Promise<ResponseRequest> {
    let code = 0;
    try {

      const valid = await getValidateElements({
        connection: this.connection,
        query: {
          sql: 'SELECT * FROM clashes_participants WHERE id = ?',
          value: [id]
        }
      });

      if (!valid) {
        throw new Error('Error al buscar el participante');
      }

      if (!valid.response) {
        code = 404;
        throw new Error('Clashes Participants no encontrada');
      }




      return getStateSuccess({
        statusCode: 201
      });

    } catch (error) {

      return getStateError({ error })
    } finally {

      this.release();

    }
  }



}