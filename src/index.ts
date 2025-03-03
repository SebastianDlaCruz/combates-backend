import cors from 'cors';
import express from 'express';
import { BoxerController } from './controllers/boxer/boxer.controller';
import { ClashesController } from './controllers/clashes/clashes.controller';
import { CoachController } from './controllers/coach/coach.controller';
import { BoxerModel } from './models/boxer/boxer.model';
import { ClashesModel } from './models/clashes/clashes.model';
import { CoachModel } from './models/couch/coach.model';
import { createRouterBoxer } from './routers/boxer/boxer-route';
import { categoryRouter } from './routers/category-route';
import { createRouterClashes } from './routers/clashes.route';
import { createRouterCoach } from './routers/coach-route';
import { schoolRouter } from './routers/school-route';
import { stateRouter } from './routers/state.route';
import { getConnectionDB } from './utils/connection-db.util';

(async () => {

  try {
    const { PORT } = process.env;

    const app = express();

    app.use(express.json());
    app.use(cors());

    const connection = await getConnectionDB();

    app.use('/api/v1/boxer', createRouterBoxer(new BoxerController(new BoxerModel(connection))));
    app.use('/api/v1/coach', createRouterCoach(new CoachController(new CoachModel(connection))));
    app.use('/api/v1/school', schoolRouter);
    app.use('/api/v1/state', stateRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/clashes', createRouterClashes(new ClashesController(new ClashesModel(connection))));

    const port = PORT || 3000;

    app.listen(port, () => {
      console.log(`Run server  http://localhost::${port}`)
    })

  } catch (error) {
    console.error(error);
  }



})();
