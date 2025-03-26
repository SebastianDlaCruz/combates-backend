import { IClashesParticipants } from "../../lib/interfaces/clashes-participants.interface";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";

export interface ClashesParticipants {
  id: number;
  id_boxer: string;
  id_clashes: number;
}

export class ClashesParticipantsModel implements IClashesParticipants {

  private connection: IConnection;

  constructor(connection: IConnection) {
    this.connection = connection;
  };

  private release() {
    this.connection.method.release();
  };


  async delete(id: number): Promise<ResponseRequest> {
    let code = 0;
    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM clashes_participants WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (valid.ok) {
        code = 400;
        throw new Error('Clashes Participants no encontrada');
      }

      await this.connection.method.query('DELETE FROM clashes_participants WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error
      });

    } finally {
      this.release();
    }
  }


  async getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {
    try {

      const [data] = await this.connection.method.query('SELECT * FROM clashes_participants');

      return getStateSuccess({
        data: data
      });

    } catch (error) {

      return getStateError({ error });

    } finally {

      this.release();
    }

  }


  async create(data: ClashesParticipants): Promise<ResponseRequest> {

    try {

      await this.connection.method.query('INSERT INTO clashes_participants SET ?', [data]);

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
        connection: this.connection.method,
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




      return getStateSuccess();

    } catch (error) {

      return getStateError({ error })
    } finally {

      this.release();

    }
  }



}