import { getStateError } from "../../lib//utils/getStateError.util";
import { getStateSuccess } from "../../lib//utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib//utils/pagination/pagination.util";
import { IBoxer } from "../../lib/interfaces/boxer.interface";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";

export interface Boxer {
  id: string;
  name: string;
  id_school: number;
  age: number;
  disability: string;
  id_category: number;
  weight: number;
  id_coach: number;
  details: string
  id_state: number;
  corner: string;
  fights: number;
  gender: string;
}


export class BoxerModel implements IBoxer {

  private connection: IConnection;


  constructor(connection: IConnection) {
    this.connection = connection;
  }

  private release() {
    if (this.connection.method) {
      this.connection.method.release();
    }
  }



  async updateCorner(id: string, body: { corner: string; }): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('SELECT * FROM Boxer WHERE id = UUID_TO_BIN(?)', [id]);

      if (!result) {
        throw new Error('Boxeador no encontrado');
      }

      const [response] = await this.connection.method.query('UPDATE Boxer SET corner = ? WHERE id = UUID_TO_BIN(?)', [body.corner, id]);


      if (!response) {
        throw new Error('Error al actualizar la esquina');
      }


      return getStateSuccess();


    } catch (error) {
      return getStateError({ error })

    } finally {
      this.release();
    }
  }


  async getBoxer(id: string): Promise<ResponseRequest> {

    try {

      const [result] = await this.connection.method.query('SELECT BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      return getStateSuccess({
        data: result
      })

    } catch (error) {

      return getStateError({ error })
    } finally {
      this.release();
    }
  }

  async create(data: Boxer): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('INSERT INTO Boxer SET ?', [data]);

      if (!result) {
        throw new Error('Error al crear  boxeador')
      }


      return getStateSuccess({
        statusCode: 201,
        message: 'éxito al crear el boxeador'
      })

    } catch (error) {

      return getStateError({ error });
    } finally {
      this.release();
    }
  }

  async update(id: string, data: Boxer): Promise<ResponseRequest> {

    let code = 0;

    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Boxer  WHERE id =  UUID_TO_BIN(?)',
          value: [id]
        }
      })


      if (!valid.ok) {
        throw new Error(valid.message)
      }

      if (!valid.response) {
        code = 400;
        throw new Error('Boxeador no encontrado');
      }

      const { age, details, disability, id_category, id_coach, id_school, id_state, name, weight, corner, fights, gender } = data;

      const [boxer] = await this.connection.method.query(`UPDATE Boxer
        SET 
         name = ?,
         id_school = ?,
         disability = ?,
         id_category = ?,
         weight = ?,
         id_coach = ?,
         details = ?,
         id_state = ?,
         corner = ? ,
         fights = ?,
         gender = ?, 
         age = ?
          WHERE 
        id = UUID_TO_BIN(?);`, [name, id_school, disability, id_category, weight, id_coach, details, id_state, corner, fights, gender, age, id]);

      if (!boxer) {
        throw new Error('Error al actualizar el boxeador');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error,
        statusCode: code === 0 ? 500 : code
      })
    } finally {
      this.release();
    }
  }

  async updateState(id: string, idState: { state: number }): Promise<ResponseRequest> {
    let code = 0;
    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * FROM Boxer WHERE id =  UUID_TO_BIN(?);',
          value: [id]
        }
      })


      if (!valid.ok) {
        throw new Error(valid.message)
      }

      if (!valid.response) {
        code = 400;
        throw new Error('Boxeador no encontrado');
      }

      const [state] = await this.connection.method.query('UPDATE Boxer SET id_state = ? WHERE id = UUID_TO_BIN(?);', [idState.state, id]);


      return getStateSuccess();

    } catch (error) {
      return getStateError({
        error, statusCode: code === 0 ? 500 : code
      })
    } finally {
      this.release();
    }
  }


  async delete(id: string): Promise<ResponseRequest> {
    let code = 0;

    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT id FROM Boxer WHERE id = UUID_TO_BIN(?);',
          value: [id]
        }
      })

      if (!valid.ok) {
        throw new Error(valid.message);
      }


      if (!valid.response) {
        code = 400;
        throw new Error('Boxeador no encontrado');
      }



      await this.connection.method.query('DELETE FROM Boxer WHERE id = UUID_TO_BIN(?);', [id]);

      return getStateSuccess({ statusCode: 204, message: 'Boxeador eliminado' });

    } catch (error) {

      return getStateError({
        error,
        statusCode: code === 0 ? 500 : code
      })
    } finally {
      this.release();
    }
  }

  async getByCategory(id_category: number): Promise<ResponseRequest> {
    let code = 0;
    try {

      const valid = await getValidateElements({
        connection: this.connection.method,
        query: {
          sql: 'SELECT * Boxer WHERE id_category =  ?;',
          value: [id_category]
        }
      })


      if (!valid.ok) {
        throw new Error(valid.message)
      }

      if (!valid.response) {
        code = 400;
        throw new Error('Boxeador no encontrado');
      }

      const [result] = await this.connection.method.query('SELECT  BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ? ', [id_category]);

      if (!result) {
        throw new Error('Erro al encontrar boxeador por su categoría');
      }

      return getStateSuccess({
        data: result
      });

    } catch (error) {
      return getStateError({
        error,
        statusCode: code === 0 ? 500 : code
      })
    } finally {
      this.release();
    }
  }

  async getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {

    try {

      if (page && pageSize) {

        const responsePagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          querySelect: 'SELECT BIN_TO_UUID(id) AS id , name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer LIMIT ? OFFSET ?;',
          queryItems: 'SELECT COUNT(*) as totalItems FROM Boxer;',
          routerApi: 'api/v1/boxer',
          connection: this.connection.method
        });

        if (!responsePagination.success) {
          throw new Error('Error al devolver la paginacion de los boxeadores');
        }

        if (responsePagination.success) {
          return getStateSuccess({
            pagination: responsePagination.pagination
          });
        }

      }



      const [boxers] = await this.connection.method.query(`
        SELECT  BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer`);

      if (!boxers) {
        throw new Error('Error al consultar los boxeadores');
      }

      return getStateSuccess({
        data: boxers
      });

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }
  }

  async search(boxer: Partial<Boxer>): Promise<ResponseRequest> {

    const { id_category, name } = boxer;


    try {

      if (name && name !== '') {

        const [result] = await this.connection.method.query('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE name LIKE ?', [`%${name}%`])

        return getStateSuccess({ data: result });
      }


      if (id_category) {

        const [result] = await this.connection.method.query('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ?', [id_category])

        return getStateSuccess({ data: result });
      }

      if ((id_category && id_category > 0) && (name && name?.length > 0)) {


        const [result] = await this.connection.method.query('SELECT BIN_TO_UUID(id) AS id, name, id_school, age, disability, id_category,weight,id_coach,details,id_state,  corner,fights,gender FROM Boxer WHERE id_category = ? AND name LIKE ?;', [id_category, `%${name}%`])


        return getStateSuccess({ data: result });
      }

      return getStateSuccess({ data: [] });

    } catch (error) {

      return getStateError({ error });

    } finally {
      this.release();
    }

  }

}