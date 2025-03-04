import { PoolConnection } from "mysql2/promise";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { ISchool } from "../../interfaces/school.interface";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSuccess.util";

export interface School {
  id: number;
  name: string
}

export class SchoolModel implements ISchool {

  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;

  }

  private release() {
    if (this.connection) {
      this.connection.release();
    }
  }

  async getSchool(id: number): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.query('SELECT * FROM School WHERE id = ?', [id]);

      if (!result) {
        throw new Error('Escuela no encontrada');
      }

      return getStateSuccess({ data: result });

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }

  async create(data: School): Promise<ResponseRequest> {
    try {

      const [res] = await this.connection.query('INSERT INTO School SET ?', [data]);

      if (!res) {
        throw new Error('Error al crear');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }

  async update(id: number, data: School): Promise<ResponseRequest> {

    try {

      const [res] = await this.connection.query('UPDATE School name = ? WHERE id = ?', [data.name, id]);

      if (!res) {
        throw new Error('Error al actualizar la escuela')
      }

      return getStateSuccess({ data });

    } catch (error) {
      const result = getStateError({
        error
      });
      return result;
    } finally {
      this.release();
    }
  }

  async delete(id: number): Promise<ResponseRequest> {
    try {

      const [res] = await this.connection.query('DELETE FROM School WHERE id = ?', [id]);

      if (!res) {
        throw new Error('Error al eliminar una escuela');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error
      });
    }
  }

  async getAll(): Promise<ResponseRequest> {

    try {

      const [res] = await this.connection.query('SELECT * FROM School');

      if (!res) {
        throw new Error('Error al consultar');
      }

      return getStateSuccess({ data: res });


    } catch (error) {

      return getStateError({
        error
      })
    }
  }

}