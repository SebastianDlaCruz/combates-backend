
import { RowDataPacket } from "mysql2";
import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";

export interface Category {
  id: number;
  name: string;
  weight: number;
}

export interface CategoryFilters {

}

export type CategoryQuery = Category & RowDataPacket;

export interface CategoryCrud extends Crud<Category, CategoryFilters> {

  /**
   * Devuelve la categoría por el id
   * @returns
   * @param id 
   */
  getCategory(id: number): Promise<ResponseRequest>;

}