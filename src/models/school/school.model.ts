import { ResponseRequest } from "../../interfaces/response-request.interface";
import { ISchool } from "../../interfaces/school.interface";
import { getConnectionDB } from "../../utils/connection-db.util";

export interface School {
  id: number;
  name: string
}

export class SchoolModel implements ISchool {
  getSchool(id: string): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }
  async create(data: School): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [res] = await connection.query('INSERT INTO School SET ?', [data]);

      if (!res) {
        throw new Error('Error al crear');
      }
      return {
        statusCode: 200,
        message: 'Éxito al crear la escuela',
        success: true
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error al crear la escuela',
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
  async getAll(): Promise<ResponseRequest> {

    try {
      const connection = await getConnectionDB();
      const [res] = await connection.query('SELECT * FROM School');

      if (!res) {
        throw new Error('Error al consultar');
      }

      return {
        statusCode: 200,
        success: true,
        data: res,
        message: 'Éxito'
      }


    } catch (error) {

      return {
        statusCode: 500,
        message: 'Error',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

}