import { Category } from "../models/category/category.model";
import { ICrud } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface ICategory extends ICrud<Category> {

  getCategory(id: number): Promise<ResponseRequest>;

}