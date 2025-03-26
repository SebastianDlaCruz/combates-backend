import { IClashes } from "../../lib/interfaces/clashes.interface";
import { IConnection } from "../../lib/interfaces/connection.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { groupDataClashes } from "./util/group-data-clashes.util";



export interface Clashes {
  id: number;
  number_clashes: number;
  id_type_clashes: number;
  rounds: number;
  id_category: number;
  id_boxer_one: string;
  id_boxer_two: string;
  id_boxer_three?: string;
  id_state: string;
}


export class ClashesModel implements IClashes {
  private connection: IConnection;
  constructor(connection: IConnection) {
    this.connection = connection;

  }

  private release() {
    if (this.connection) {
      this.connection.method.release();
    }
  }

  async create(data: Clashes): Promise<ResponseRequest> {

    try {


      const { id_boxer_one, id_boxer_two, id_category, id_state, id_type_clashes, number_clashes, rounds } = data;

      console.log(data);

      const [result] = await this.connection.method.query(`
        INSERT INTO Clashes (id_boxer_one,id_boxer_two,id_category,id_state,id_type_clashes,number_clashes,rounds) 
         VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,?,?)`
        , [id_boxer_one, id_boxer_two, id_category, id_state, id_type_clashes, number_clashes, rounds]);

      if (!result) {
        throw new Error('Error al crear el enfrentamiento');
      }

      return getStateSuccess({
        statusCode: 201,
      })

    } catch (error) {
      return getStateError({ error });
    } finally {
      this.release();
    }
  }

  async update(id: number, data: Clashes): Promise<ResponseRequest> {
    try {
      const { id_boxer_one, id_boxer_two, id_boxer_three, id_type_clashes, number_clashes, rounds, id_state, id_category } = data;

      const [result] = await this.connection.method.query('UPDATE Clashes id_boxer_one = ?,id_boxer_two = ?,id_boxer_three = ?,id_type_clashes = ? ,number_clashes = ?,rounds =?,id_state = ?,id_category = ? WHERE id = ?', [id_boxer_one, id_boxer_two, id_boxer_three, id_type_clashes, number_clashes, rounds, id_state, id_category, id]);

      if (!result) {
        throw new Error('Error al actualizar el enfrentamiento');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({ error });
    } finally {
      this.release();
    }
  }

  delete(id: number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  async getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {

    try {


      if (page && pageSize) {

        const responsePagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          querySelect: 'SELECT Clashes.id as idClashes ,  BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,weight, corner, fights, gender,details,id_state FROM Clashes JOIN Boxer ON Clashes.id_boxer_one = Boxer.id OR Clashes.id_boxer_two = Boxer.id OR Clashes.id_boxer_tree = Boxer.id LIMIT ? OFFSET ?',
          queryItems: 'SELECT COUNT(*) as totalItems FROM Clashes;',
          routerApi: '/api/v1/clashes',
          connection: this.connection.method
        })

        if (!responsePagination.success) {
          throw new Error('Error al consultar los combates');
        }

        const dataPagination = responsePagination.pagination.data as any[];

        const data = groupDataClashes(dataPagination);

        responsePagination.pagination.data = data;

        return getStateSuccess({
          pagination: responsePagination.pagination
        })

      }

      const [result] = await this.connection.method.query('SELECT Clashes.id as idClashes , BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach, weight, corner, fights, gender,details,id_state ,FROM Clashes JOIN Boxer ON Clashes.idBoxerOne = Boxer.id OR Clashes.idBoxerTwo = Boxer.id OR Clashes.idBoxerTree = Boxer.id');


      const clashes = result as any[];

      const group = groupDataClashes(clashes);

      return getStateSuccess({ data: group });

    } catch (error) {
      return getStateError({
        error
      })
    } finally {
      this.release();
    }

  }

  async getClashes(id: number): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('SELECT * FROM Clashes WHERE id = ?', [id]);

      if (!result) {
        throw new Error('Error al consultar un enfrentamiento');

      }

      return getStateSuccess({
        data: result,
      })

    } catch (error) {
      return getStateError({ error })
    } finally {
      this.release();
    }
  }

  async updateState(id: number, id_state: number): Promise<ResponseRequest> {
    try {

      const [result] = await this.connection.method.query('UPDATE Clashes id_state=? WHERE id = ?', [id_state, id]);
      if (!result) {
        throw new Error('Error actualizar el estado');
      }

      return getStateSuccess({
        data: result
      });

    } catch (error) {
      return getStateError({ error })
    } finally {
      this.release();
    }
  }

}