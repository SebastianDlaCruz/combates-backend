import { IGetAll } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface IStateBoxer extends IGetAll {

  getStateBoxer(id: number): Promise<ResponseRequest>
}