import { Pagination } from "../interfaces/response-request.interface";
import { getConnectionDB } from "./connection-db.util";

interface Config {
  page: number;
  pageSize: number
  querySelect: string;
  queryItems: string;
  routerApi: string
}

export const getPagination = async (config: Config): Promise<Pagination | null> => {

  try {

    const connection = await getConnectionDB();

    const offset = (config.page - 1) * config.pageSize;

    const [response] = await connection.query(config.querySelect, [config.pageSize, offset]);

    if (!response) {
      throw new Error('Error al consultar los boxeadores');
    }

    const [totalItemsResult] = await connection.query(config.queryItems);

    if (!totalItemsResult) {
      throw new Error('Error al calcular los items');
    }
    const totalItems = totalItemsResult as [{ totalItems: number }]

    const total = totalItems[0].totalItems;

    const totalPages = Math.ceil(total / config.pageSize);

    const next = (config.page < totalPages) ? `${config.routerApi}?page=${config.page + 1}&pageSize=${config.pageSize}` : null;

    const prev = (config.page > 1) ? `${config.routerApi}?page=${config.page - 1}&pageSize=${config.pageSize}` : null;


    return {
      data: response,
      total: total,
      totalPages: totalPages,
      currentPage: config.page,
      pageSize: config.pageSize,
      next,
      prev
    }

  } catch (err) {

    return null;
  }

}