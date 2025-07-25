import { PoolConnection } from "mysql2/promise";

interface Config {
  connection: PoolConnection,
  element: string;
  where: unknown[];
  properties?: string;
  parseUUID?: boolean
}

export const getFindOne = (config: Config) => {
  return config.connection.query(`SELECT ${config.properties ?? '*'} FROM ${config.element} WHERE id = ${config.parseUUID ? 'UUID_TO_BIN(?)' : '?'}`, config.where)
}