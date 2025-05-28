import { IConnection } from "../interfaces/connection.interface";

export class ConnectionDB {

  protected connection: IConnection;
  constructor(connection: IConnection) {
    this.connection = connection;
  }

  protected release() {
    if (this.connection.method) {
      this.connection.method.release();
    }
  }
}