import { Pagination } from "../response-request.interface";

export interface StateRequest {
  statusCode: number;
  message: string;
  success: boolean;
  error?: string;
  data?: any;
  pagination?: Pagination
}

export interface Config {
  statusCode?: number;
  message?: string;
  error?: any;
  data?: any;
  pagination?: Pagination;
}