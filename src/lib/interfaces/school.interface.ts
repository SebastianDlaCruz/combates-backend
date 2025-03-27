import { School } from "../../models/school/school.model";
import { ICreate, IDelete, IGetAll, IUpdate } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface ISchool extends ICreate<School>, IUpdate<School>, IDelete, IGetAll {
  /**
   * Devuelve la escuela por el id
   * @param id 
   */
  getSchool(id: number): Promise<ResponseRequest>
}