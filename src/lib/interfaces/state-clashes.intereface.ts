import { IGetAll } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface IStateClashes extends IGetAll {
  getStateClashes(id: number): Promise<ResponseRequest>;

}