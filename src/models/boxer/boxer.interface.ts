import { RowDataPacket } from "mysql2";
import { InternalServerError } from "../../lib/erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../../lib/erros/not-found/not-found.error";
import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";


export interface BoxerFilters {
  page?: string;
  pageSize?: string
}


export interface BoxerCrud extends Crud<Boxer, BoxerFilters> {
  /**
   * Actualiza el estado de un boxeador
   * @param id 
   * @param idState 
   */
  updateState(id: string, idState: { state: number }): Promise<ResponseRequest>;
  /**
   * Actualiza la esquina de un boxeador
   * @param id 
   * @param body
   */
  updateCorner(id: string, body: { corner: string }): Promise<ResponseRequest>;
  /**
   * Devuelve un boxeador por su id
   * @param id 
   */
  getBoxer(id: string): Promise<ResponseRequest | InternalServerError | NotFoundError>;

  /**
   * Busca boxeadores por su nombre y categoría
   * @param boxer
   * 
   */
  search(boxer: Partial<Boxer>): Promise<ResponseRequest>;
}


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


export interface BoxerFilters {
  page?: string;
  pageSize?: string
}


export type BoxerQuery = Boxer & RowDataPacket;