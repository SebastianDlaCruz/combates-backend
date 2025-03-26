import { Boxer } from "../../models/boxer/boxer.model";
import { ICrud } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";



export interface IBoxer extends ICrud<Boxer> {
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
  getBoxer(id: string): Promise<ResponseRequest>;
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