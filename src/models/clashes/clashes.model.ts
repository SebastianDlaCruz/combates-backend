import { IClashes } from "../../interfaces/clashes.interface";
import { ResponseRequest } from "../../interfaces/response-request.interface";
import { getConnectionDB } from "../../utils/connection-db.util";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSucces.utilt";
import { getPagination } from "../../utils/pagination.util";
import { groupDataClashes } from "./util/group-data-clashes.util";

interface Boxer {
  id: string;
  id_school: string;
}

export interface Clashes {
  id: number;
  number_clashes: number;
  id_type_clashes: number;
  rounds: number;
  id_category: number;
  id_boxer_one: string;
  id_boxer_two: string;
  id_boxer_tree?: string;
  id_state: string;
}


export class ClashesModel implements IClashes {


  async create(data: Clashes): Promise<ResponseRequest> {

    try {
      const connection = await getConnectionDB();

      const result = await connection.query('INSERT INTO Clashes SET ?', [data]);

      if (!result) {
        throw new Error('Error al crear el enfrentamiento');
      }

      return getStateSuccess({
        data: result,
        statusCode: 201
      })

    } catch (error) {
      return getStateError({ error });
    }
  }

  async update(data: Clashes): Promise<ResponseRequest> {
    try {
      const { id_boxer_one, id_boxer_two, id_boxer_tree, id_type_clashes, number_clashes, rounds, id_state, id_category } = data;
      const connection = await getConnectionDB();
      const [result] = await connection.query('UPDATE Clashes id_boxer_one = ?,id_boxer_two = ?,id_boxer_tree = ?,id_type_clashes = ? ,number_clashes = ?,rounds =?,id_state = ?,id_category = ?', [id_boxer_one, id_boxer_two, id_boxer_tree, id_type_clashes, number_clashes, rounds, id_state, id_category]);

      if (!result) {
        throw new Error('Error al actualizar el enfrentamiento');
      }

      return getStateSuccess();

    } catch (error) {
      return getStateError({ error });
    }
  }

  delete(id: number): Promise<ResponseRequest> {
    throw new Error("Method not implemented.");
  }

  async getAll(page?: string, pageSize?: string): Promise<ResponseRequest> {

    try {

      const connection = await getConnectionDB();

      if (page && pageSize) {

        const pagination = await getPagination({
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          querySelect: 'SELECT Clashes.id as idClashes ,  BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach,details,weight, corner, fights, gender,details,id_state FROM Clashes JOIN Boxer ON Clashes.id_boxer_one = Boxer.id OR Clashes.id_boxer_two = Boxer.id OR Clashes.id_boxer_tree = Boxer.id LIMIT ? OFFSET ?',
          queryItems: 'SELECT COUNT(*) as totalItems FROM Clashes;',
          routerApi: '/api/v1/clashes'
        })

        if (pagination === null) {
          throw new Error('Error al consultar los combates');
        }

        const dataPagination = pagination.data as any[];

        const data = groupDataClashes(dataPagination);

        pagination.data = data;

        return getStateSuccess({
          pagination,
        })

      }

      const [result] = await connection.query('SELECT Clashes.id as idClashes , BIN_TO_UUID(id) ,name,id_school,disability,id_category,weight,id_coach, weight, corner, fights, gender,details,id_state ,FROM Clashes JOIN Boxer ON Clashes.idBoxerOne = Boxer.id OR Clashes.idBoxerTwo = Boxer.id OR Clashes.idBoxerTree = Boxer.id');


      const clashes = result as any[];

      const group = groupDataClashes(clashes);

      return getStateSuccess({ data: group });

    } catch (error) {
      return getStateError({
        error
      })
    }

  }

  async getClashes(id: number): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [result] = await connection.query('SELECT * FROM Clashes WHERE id = ?', [id]);

      if (!result) {
        throw new Error('Error al consultar un enfrentamiento');

      }

      return getStateSuccess({
        data: result,
      })

    } catch (error) {
      return getStateError({ error })
    }
  }

  async updateState(id: number, id_state: number): Promise<ResponseRequest> {
    try {
      const connection = await getConnectionDB();
      const [result] = await connection.query('UPDATE Clashes id_state=? WHERE id = ?', [id_state, id]);
      if (!result) {
        throw new Error('Error actualizar el estado');
      }

      return getStateSuccess({
        data: result
      });

    } catch (error) {
      return getStateError({ error })
    }
  }

}