import { Boxer } from "../../models/boxer/type";
import { InternalServerError } from "../erros/internal-server-error/internal-server.error";
import { NotFoundError } from "../erros/not-found/not-found.error";
import { ICreate, IDelete, IGetAll, IUpdate } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";



export interface IBoxer extends ICreate<Boxer>, IUpdate<Boxer>, IDelete, IGetAll {
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
   * Devuelve los boxeadores por categoría
   * @param id_category 
   */
  getByCategory(id_category: number): Promise<ResponseRequest>;
  /**
   * Busca boxeadores por su nombre y categoría
   * @param boxer
   * 
   */
  search(boxer: Partial<Boxer>): Promise<ResponseRequest>;
}