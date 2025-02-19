import { Coach } from "../models/couch/coach.model";
import { ICrud } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface ICoach extends ICrud<Coach> {
  getCoach(id: string): Promise<ResponseRequest>;
}