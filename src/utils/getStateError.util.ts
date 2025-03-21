import { ResponseRequest } from "../interfaces/response-request.interface"
import { Config } from "../models/request-state/request.state.model"


export const getStateError = (config?: Config): ResponseRequest => {
  return {
    statusCode: config?.statusCode ? config.statusCode : 500,
    success: false,
    error: config?.error instanceof Error ? config.error.message : 'Error desconocido',
    message: config?.message ? config.message : 'Error'
  }
}