import { Coach } from "../../models/couch/coach.model";
import { ICreate, IDelete, IGetAll, IUpdate } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface ICoach extends ICreate<Coach>, IUpdate<Coach>, IDelete, IGetAll {
  getCoach(id: number): Promise<ResponseRequest>
}