import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";

export interface Coach {
  id: number;
  name: string;
  id_school: string;
}

export interface CoachFilter {
  page?: string;
  pageSize?: string;
}


export interface CoachCrud extends Crud<Coach, CoachFilter> {
  getCoach(id: number): Promise<ResponseRequest>
}