import { ResponseRequest } from "./response-request.interface";

export interface ICrud<T> {
  create(data: T): Promise<ResponseRequest>;
  update(id: string | number, data: T): Promise<ResponseRequest>;
  delete(id: string | number): Promise<ResponseRequest>;
  getAll(page?: string, pageSize?: string): Promise<ResponseRequest>;
}