import { RowDataPacket } from "mysql2";
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

type ClashesParticipantsQuery = ClashesParticipants & RowDataPacket;

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
        element: 'Clashes_Participants',
        filterBy: 'id',
        value: [id]
      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (!valid.response) {
        code = 400;
        throw new Error('Enfrentamiento no encontrada');
      }

      await this.connection.method.query('DELETE FROM Clashes_Participants WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error
      });

    } finally {
      this.release();
    }
  }


  async getAll(): Promise<ResponseRequest> {

    try {

      const [data] = await this.connection.method.query<ClashesParticipantsQuery[]>(`
        SELECT id, BIN_TO_UUID(id_boxer) as id_boxer , id_clashes FROM Clashes_Participants`);

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
      const { id_boxer, id_clashes } = data;

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Boxer WHERE id = UUID_TO_BIN(?)',
          value: [id_boxer]
        }
      });

      if (!valid.ok) {
        throw new Error(valid.message)
      }

      if (!valid.response) {
        throw new Error('Boxeador no encontrado')
      }

      await this.connection.method.query(`
        INSERT INTO  Clashes_Participants (id_boxer,id_clashes ) VALUES (UUID_TO_BIN(?),?)`
        , [id_boxer, id_clashes]);

      return getStateSuccess({
        statusCode: 201
      });

    } catch (error) {
      return getStateError({ error })

    } finally {
      this.release();
    }

  };

  async update(id: number, data: ClashesParticipants): Promise<ResponseRequest> {

    let code = 0;

    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Clashes_Participants WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (!valid.response) {
        code = 404;
        throw new Error('Clashes Participants no encontrada');
      }

      const { id_boxer, id_clashes } = data;

      this.connection.method.query(` 
        UPDATE Clashes_Participants 
        SET
         id_boxer = ?,
         id_clashes = ?
         WHERE id = ?`, [id, id_boxer, id_clashes]);

      return getStateSuccess({
        statusCode: code !== 0 ? 500 : code
      });

    } catch (error) {

      return getStateError({ error })
    } finally {

      this.release();

    }
  }

  async getClashesParticipants(id_clashes: number): Promise<ResponseRequest> {
    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        element: 'Clashes_Participants',
        filterBy: 'id_clashes',
        value: [id_clashes]

      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (!valid.response) {
        throw new Error('Enfrentamiento no encontrado')
      }

      const [result] = await this.connection.method.query('SELECT id , BIN_TO_UUID(id_boxer) as id_boxer , id_clashes FROM Clashes_Participants WHERE id_clashes = ?', [id_clashes]);

      const data = result as any[];

      return getStateSuccess({ data: [...data] })

    } catch (error) {
      return getStateError({ error })
    } finally {
      this.release();
    }
  }


}