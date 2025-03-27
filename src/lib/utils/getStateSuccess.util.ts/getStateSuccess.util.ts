import { Config } from "../../../models/request-state/request.state.model"
import { ResponseRequest } from "../../interfaces/response-request.interface"

/**
 *  Función que retorna un objeto con el estado de la petición exitosa
 * @param config 
 * @returns 
 */
export const getStateSuccess = (config?: Config): ResponseRequest => {

  if (config?.pagination) {

    return {
      statusCode: config?.statusCode ? config.statusCode : 200,
      success: true,
      message: config?.message ? config.message : 'Éxito',
      pagination: config.pagination
    }
  }

  if (config?.data) {

    return {
      statusCode: config?.statusCode ? config.statusCode : 200,
      success: true,
      message: config?.message ? config.message : 'Éxito',
      data: config.data
    }

  }

  return {
    statusCode: config?.statusCode ? config.statusCode : 200,
    success: true,
    message: config?.message ? config.message : 'Éxito',

  }

}