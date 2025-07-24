import { RowDataPacket } from "mysql2";
import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";


export interface Clashes {
  id: number;
  number: number;
  id_type_clashes: number;
  rounds: number;
  id_category: number;
  id_state: string;
};


export interface ClashesFilters {
  page?: string;
  pageSize?: string;
}

export type ClashesQuery = Clashes & RowDataPacket;



export interface ClashesCrud extends Crud<Clashes, ClashesFilters> {
  /**
   *  Devuelve los enfrentamiento por id
   * @param id 
   */
  getClashes(id: number): Promise<ResponseRequest>;
  /**
   *  Actualiza los enfrentamiento por id y numero de estado
   * @param id 
   */
  updateState(id: number, id_state: number): Promise<ResponseRequest>;
}