import { ICoach } from "../../interfaces/coach.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getConnectionDB } from "../../utils/connection-db.util";

export interface Coach {
  id: number;
  name: string;
  id_school: string;
}

export class CoachModel implements ICoach {

  getCoach(id: string): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  async create(data: Coach): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [result] = await connection.query('INSERT INTO Coach SET ?', [data]);
      return {
        statusCode: 200,
        success: true,
        message: 'Entrenador creador con éxito'
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error al crear un entrenador',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  update(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

}
