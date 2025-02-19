import { ResponseRequest } from "./response-request.interface";

export interface ICrud<T> {
  create(data: T): Promise<ResponseRequest>;
  update(id: string | number): Promise<ResponseRequest>;
  delete(id: string | number): Promise<ResponseRequest>;
  getAll(): Promise<ResponseRequest>;
}