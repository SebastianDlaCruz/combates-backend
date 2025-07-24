import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";

export interface School {
  id: number;
  name: string
}


export interface SchoolFilters {
  page?: string;
  pageSize?: string;
}



export interface SchoolCrud extends Crud<School, SchoolFilters> {
  /**
   * Devuelve la escuela por el id
   * @param id 
   */
  getSchool(id: number): Promise<ResponseRequest>
}