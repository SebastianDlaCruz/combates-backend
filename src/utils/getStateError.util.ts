export interface Error {
  statusCode: number;
  message: string;
  success: boolean;
  error: string;
}

export interface Config {
  statusCode?: number;
  message?: string;
  error: any;
}

export const getStateError = (config?: Config): Error => {
  return {
    statusCode: config?.statusCode ? config.statusCode : 500,
    success: false,
    error: config?.error instanceof Error ? config.error.message : 'Error desconocido',
    message: config?.message ? config.message : 'Error'
  }
}