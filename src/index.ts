import cors from 'cors';
import express from 'express';
import { PoolConnection } from 'mysql2/promise';
import { IMain } from './interfaces/main.interface';
import { configMain } from './server.config';


(async (config: IMain<PoolConnection>) => {

  try {

    const { connectionMethod, providerRouter, textRunServer, port } = config;

    const { PORT } = process.env;

    const app = express();

    app.use(express.json());
    app.use(cors());

    const connection = await connectionMethod();

    providerRouter.forEach((data) => {
      app.use(data.path, data.generateRouter(new data.controller(new data.model(connection))));
    });
    const p = PORT || port;

    app.listen(port, () => {
      console.log(`${textRunServer}:${p}`)
    });

  } catch (error) {
    console.error(error);
  }

})(configMain);







