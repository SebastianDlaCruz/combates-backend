import { RowDataPacket } from "mysql2";
import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";

export interface StateBoxer {
  id: number;
  name: string;
};


export interface StateBoxerFilters {
  page?: string;
  pageSize?: string;
}

export type StateBoxerQuery = StateBoxer & RowDataPacket;
export interface StateBoxerCrud extends Crud<StateBoxer, StateBoxerFilters> {

  getStateBoxer(id: number): Promise<ResponseRequest>
}