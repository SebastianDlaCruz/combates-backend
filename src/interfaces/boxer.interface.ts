import { Boxer } from "../models/boxer/boxer.model";
import { ICrud } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface IBoxer extends ICrud<Boxer> {
  updateState(id: string, idState: number): Promise<ResponseRequest>;
  getBoxer(id: string): Promise<Boxer>;
}