import { PoolConnection } from "mysql2/promise";

export interface IConnection {
  method: PoolConnection
} 