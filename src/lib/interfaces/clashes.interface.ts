import { Clashes } from "../../models/clashes/clashes.model";
import { ICrud } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";


export interface IClashes extends ICrud<Clashes> {

  getClashes(id: number): Promise<ResponseRequest>;
  updateState(id: number, id_state: number): Promise<ResponseRequest>;
}