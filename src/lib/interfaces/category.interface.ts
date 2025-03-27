import { Category } from "../../models/category/category.model";
import { ICreate, IDelete, IGetAll, IUpdate } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface ICategory extends ICreate<Category>, IUpdate<Category>, IDelete, IGetAll {

  /**
   * Devuelve la categoría por el id
   * @returns
   * @param id 
   */
  getCategory(id: number): Promise<ResponseRequest>;

}