import { ConnectionDB } from "../../lib/config/connection-db.config";
import { CodeErrors } from "../../lib/const/code-errors.const";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getFindOne } from "../../lib/utils/getFindOne/getFindOne.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { ClashesParticipantsCrud, ClashesParticipantsUpdateQuery } from "./clashes-participants.interface";

export interface ClashesParticipants {
  id: number;
  id_boxer: string;
  id_clashes: number;
}

export class ClashesParticipantsModel extends ConnectionDB implements ClashesParticipantsCrud {


  constructor(connection: IConnection) {
    super(connection);
  };


  async delete(id: number): Promise<ResponseRequest> {


    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes_Participants',
        where: [id]
      })

      if (!exist) {
        throw new NotFoundError('Clashes Participants no encontrada', CodeErrors.CLASHES_PARTICIPANTS_NOT_FOUND);
      }

      await this.connection.method.query('DELETE FROM Clashes_Participants WHERE id = ?', [id]);

      return getStateSuccess();

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al eliminar Clashes Participants', CodeErrors.ERROR_DELETE_CLASHES_PARTICIPANTS);

    } finally {
      this.release();
    }
  }


  async getAll(): Promise<ResponseRequest> {

    try {

      const [data] = await this.connection.method.query(`
        SELECT id, BIN_TO_UUID(id_boxer) as id_boxer , id_clashes FROM Clashes_Participants`);

      return getStateSuccess({
        data: data
      });

    } catch (error) {

      throw new InternalServerError('Error al obtener Clashes Participants', CodeErrors.CLASHES_PARTICIPANTS_NOT_FOUND);

    } finally {

      this.release();
    }

  }


  async create(data: ClashesParticipants): Promise<ResponseRequest> {
    try {


      const existBoxer = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes_Participants',
        where: [data.id_boxer],
        parseUUID: true
      })

      if (!existBoxer) {
        throw new NotFoundError('Boxeador no encontrado', CodeErrors.BOXER_NOT_FOUND);

      }

      const existClashes = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes',
        where: [data.id_clashes],
      })

      if (!existClashes) {
        throw new NotFoundError('Enfrentamiento no encontrado', CodeErrors.CLASHES_NOT_FOUND);
      }

      const { id_boxer, id_clashes } = data;

      await this.connection.method.query(`
        INSERT INTO  Clashes_Participants (id_boxer,id_clashes ) VALUES (UUID_TO_BIN(?),?)`
        , [id_boxer, id_clashes]);

      return getStateSuccess({
        statusCode: 201
      });

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al crear Clashes Participants', CodeErrors.ERROR_CREATE_CLASHES_PARTICIPANTS);

    } finally {
      this.release();
    }

  };

  async update(id: number, data: ClashesParticipants): Promise<ResponseRequest> {

    try {

      const exist = await getFindOne({
        connection: this.connection.method,
        element: 'Clashes_Participants',
        where: [id]
      })

      if (!exist) {
        throw new NotFoundError('Clashes Participants no encontrada', CodeErrors.CLASHES_PARTICIPANTS_NOT_FOUND);
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

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al actualizar Clashes Participants', CodeErrors.ERROR_UPDATE_CLASHES_PARTICIPANTS);

    } finally {

      this.release();

    }
  }

  async getClashesParticipants(id_clashes: number): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query<ClashesParticipantsUpdateQuery[]>('SELECT id , BIN_TO_UUID(id_boxer) as id_boxer , id_clashes FROM Clashes_Participants WHERE id_clashes = ?', [id_clashes]);

      if (!result) {
        throw new NotFoundError('Clashes Participants no encontrada', CodeErrors.CLASHES_PARTICIPANTS_NOT_FOUND);
      }


      return getStateSuccess({ data: result })

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Error al obtener Clashes Participants', CodeErrors.CLASHES_PARTICIPANTS_NOT_FOUND);

    } finally {
      this.release();
    }
  }


}