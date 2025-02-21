import { Clashes } from "../models/clashes/clashes.model";
import { ResponseRequest } from "./response-request.interface";


export interface IClashes {
  create(data: Clashes): Promise<ResponseRequest>;
  update(data: Clashes): Promise<ResponseRequest>;
  delete(id: number): Promise<ResponseRequest>;
  getAll(page?: string, pageSize?: string): Promise<ResponseRequest>;
  getClashes(id: number): Promise<ResponseRequest>;
  updateState(id: number, id_state: number): Promise<ResponseRequest>;
}