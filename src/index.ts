
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { errorMiddleware } from './lib/middlewars/error.middleware';
import { configMain } from './server.config';
import swaggerSpec from './swagger';

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

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


    const p = PORT || port;

    app.listen(port, () => {
      console.log(`${textRunServer}:${p}`)
    });

  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
  }

})(configMain);







