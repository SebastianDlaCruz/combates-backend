import { Clashes } from "../../models/clashes/clashes.model";
import { ICreate, IDelete, IUpdate } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";


export interface IClashes extends ICreate<Clashes>, IUpdate<Clashes>, IDelete {
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

  getAll(page?: string, pageSize?: string, search?: string): Promise<ResponseRequest>
}