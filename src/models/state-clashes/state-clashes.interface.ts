import { RowDataPacket } from "mysql2";
import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";

export interface StateClashes {
  id: number;
  name: string;
}

export type StateClashesQuery = StateClashes & RowDataPacket;

export interface StateClashesCrud extends Crud<StateClashes> {
  getStateClashes(id: number): Promise<ResponseRequest>;

}