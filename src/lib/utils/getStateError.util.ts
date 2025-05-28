import { Config } from "../interfaces/request-state/request.state.model"
import { ResponseRequest } from "../interfaces/response-request.interface"

/**
 *  Función que retorna un objeto con el estado de error
 * @param config 
 * @returns 
 */
export const getStateError = (config?: Config): ResponseRequest => {
  return {
    statusCode: config?.statusCode ? config.statusCode : 500,
    success: false,
    error: config?.error instanceof Error ? config.error.message : 'Error desconocido',
    message: config?.message ? config.message : 'Error'
  }
}