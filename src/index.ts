
import express from 'express';
import { errorMiddleware } from './lib/middlewars/error.middleware';
import { configMain } from './server.config';

(async (config) => {

  try {

    const { connectionMethod, providerRouter, textRunServer, port, corsMethod } = config;

    const { PORT } = process.env;

    const app = express();

    app.use(express.json());
    app.use(corsMethod());

    const connection = await connectionMethod();

    providerRouter.forEach((data) => {
      app.use(data.path, data.generateRouter(new data.controller(new data.model({ method: connection }))));
    });

    app.use(errorMiddleware);

    const p = PORT || port;

    app.listen(port, () => {
      console.log(`${textRunServer}:${p}`)
    });

  } catch (error) {
    console.error(error);
  }

})(configMain);







