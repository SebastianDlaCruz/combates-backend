import { School } from "../models/school/school.model";
import { ICrud } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface ISchool extends ICrud<School> {
  getSchool(id: number): Promise<ResponseRequest>
}