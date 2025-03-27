import { Coach } from "../../models/couch/coach.model";
import { ICreate, IDelete, IGetAll, IUpdate } from "./crud.interface";

export interface ICoach extends ICreate<Coach>, IUpdate<Coach>, IDelete, IGetAll {

}