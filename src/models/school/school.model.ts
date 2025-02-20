import { ResponseRequest } from "../../interfaces/response-request.interface";
import { ISchool } from "../../interfaces/school.interface";
import { getConnectionDB } from "../../utils/connection-db.util";
import { getStateError } from "../../utils/getStateError.util";

export interface School {
  id: number;
  name: string
}

export class SchoolModel implements ISchool {

  async getSchool(id: number): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();

      const [result] = await connection.query('SELECT * FROM School WHERE id = ?', [id]);

      if (!result) {
        throw new Error('Escuela no encontrada');
      }

      return {
        statusCode: 200,
        message: 'Éxito',
        success: true,
        data: result,

      }
    } catch (error) {
      return getStateError({
        error
      })
    }
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
      return getStateError({
        error
      })
    }
  }

  async update(id: number, data: School): Promise<ResponseRequest> {

    try {
      const connection = await getConnectionDB();
      const [res] = await connection.query('UPDATE School name = ? WHERE id = ?', [data.name, id]);

      if (!res) {
        throw new Error('Error al actualizar la escuela')
      }
      return {
        statusCode: 200,
        message: 'Éxito',
        success: true,
        data: data,

      }
    } catch (error) {
      const result = getStateError({
        error
      });
      return result;
    }
  }

  async delete(id: number): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [res] = await connection.query('DELETE FROM School WHERE id = ?', [id]);

      if (!res) {
        throw new Error('Error al eliminar una escuela');
      }

      return {
        statusCode: 200,
        message: 'Éxito',
        success: true,
      }

    } catch (error) {
      return getStateError({
        error
      });
    }
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

      return getStateError({
        error
      })
    }
  }

}