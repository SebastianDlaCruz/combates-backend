import { PoolConnection } from "mysql2/promise";
import { Pagination } from "../../interfaces/response-request.interface";

interface Config {
  page: number;
  pageSize: number
  querySelect: string;
  queryItems: string;
  routerApi: string,
  connection: PoolConnection
}

interface ResponsePagination {
  success: boolean;
  pagination: Pagination;
}

export const getPagination = async (config: Config): Promise<ResponsePagination> => {

  try {

    const offset = (config.page - 1) * config.pageSize;

    const [response] = await config.connection.query(config.querySelect, [config.pageSize, offset]);

    if (!response) {
      throw new Error('Error al consultar los items');
    }

    const [totalItemsResult] = await config.connection.query(config.queryItems);

    if (!totalItemsResult) {
      throw new Error('Error al calcular los elementos');
    }

    const totalItems = totalItemsResult as [{ totalItems: number }]

    const total = totalItems[0].totalItems;

    const totalPages = Math.ceil(total / config.pageSize);

    const next = (config.page < totalPages) ? `${config.routerApi}?page=${config.page + 1}&pageSize=${config.pageSize}` : null;

    const prev = (config.page > 1) ? `${config.routerApi}?page=${config.page - 1}&pageSize=${config.pageSize}` : null;
    return {
      success: true,
      pagination: {
        data: response,
        total: total,
        totalPages: totalPages,
        currentPage: config.page,
        pageSize: config.pageSize,
        next,
        prev
      }

    }

  } catch (err) {
    return {
      success: false,
      pagination: {
        data: null,
        total: -1,
        totalPages: -1,
        currentPage: -1,
        pageSize: -1,
        next: null,
        prev: null,
      }
    }
  } finally {
    if (config.connection) {
      config.connection.release();
    }
  }

}