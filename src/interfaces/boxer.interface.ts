import { Boxer } from "../models/boxer/boxer.model";
import { ICrud } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";



export interface IBoxer extends ICrud<Boxer> {
  updateState(id: string, idState: { state: number }): Promise<ResponseRequest>;
  updateCorner(id: string, body: { corner: string }): Promise<ResponseRequest>;
  getBoxer(id: string): Promise<ResponseRequest>;
  getByCategory(id_category: number): Promise<ResponseRequest>;
  search(boxer: Partial<Boxer>): Promise<ResponseRequest>;
}