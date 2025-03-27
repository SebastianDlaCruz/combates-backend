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
          sql: 'SELECT * FROM Clashes_Participants WHERE id = ?',
          value: [id]
        }
      });

      if (!valid.ok) {
        throw new Error(valid.message);
      }

      if (valid.ok) {
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


  async getAll(id_category: number): Promise<ResponseRequest> {

    try {

      if (!id_category) {

        const [data] = await this.connection.method.query(`
          SELECT BIN_TO_UUID(Boxer.id) AS id,
            Clashes_Participants.id as id_clashes_participants,
            Boxer.name,
            Boxer.id_school,
            Boxer.age,
            Boxer.disability,
            Boxer.id_category,
            Boxer.weight,
            Boxer.id_coach,
            Boxer.details,
            Boxer.id_state,
            Boxer.corner,
            Boxer.fights,
            Boxer.gender
            FROM Clashes_Participants JOIN Boxer ON Clashes_Participants.id_boxer = Boxer.id `);

        return getStateSuccess({ data });

      }

      const [data] = await this.connection.method.query(`
        SELECT 
          Clashes_Participants.id as id_clashes_participants,
          BIN_TO_UUID(Boxer.id) AS id,
          Boxer.name,
          Boxer.id_school,
          Boxer.age,
          Boxer.disability,
          Boxer.id_category,
          Boxer.weight,
          Boxer.id_coach,
          Boxer.details,
          Boxer.id_state,
          Boxer.corner,
          Boxer.fights,
          Boxer.gender
          FROM Clashes_Participants JOIN Boxer ON Clashes_Participants.id_boxer = Boxer.id 
          WHERE Boxer.id_category = ? `, [id_category]);

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

      return getStateSuccess();

    } catch (error) {

      return getStateError({ error })
    } finally {

      this.release();

    }
  }




}