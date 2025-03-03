import { PoolConnection } from "mysql2/promise";
import { ICoach } from "../../interfaces/coach.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSuccess.util";

export interface Coach {
  id: number;
  name: string;
  id_school: string;
}

export class CoachModel implements ICoach {
  private connection: PoolConnection;
  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  getCoach(id: string): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  private release() {
    if (this.connection) {
      this.connection.release();
    }
  }
  async create(data: Coach): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.query('INSERT INTO Coach SET ?', [data]);
      if (!result) {
        throw new Error('Error al crear un entrenador')
      }
      return getStateSuccess({ statusCode: 201 });

    } catch (error) {
      return getStateError({ error });

    } finally {
      this.release();
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
