import cors from 'cors';
import express from 'express';
import { BoxerController } from './controllers/boxer/boxer.controller';
import { CategoryController } from './controllers/category/category.controller';
import { ClashesController } from './controllers/clashes/clashes.controller';
import { CoachController } from './controllers/coach/coach.controller';
import { SchoolController } from './controllers/school/school.controller';
import { StateController } from './controllers/state/state.controller';
import { BoxerModel } from './models/boxer/boxer.model';
import { CategoryModel } from './models/category/category.model';
import { ClashesModel } from './models/clashes/clashes.model';
import { CoachModel } from './models/couch/coach.model';
import { SchoolModel } from './models/school/school.model';
import { StateModel } from './models/state/state.model';
import { createRouterBoxer } from './routers/boxer/boxer-route';
import { createRouterCategory } from './routers/category/category-route';
import { createRouterClashes } from './routers/clashes/clashes.route';
import { createRouterCoach } from './routers/coach/coach-route';
import { createRouterSchool } from './routers/school/school-route';
import { createRouterState } from './routers/state/state.route';
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
    app.use('/api/v1/school', createRouterSchool(new SchoolController(new SchoolModel(connection))));
    app.use('/api/v1/state', createRouterState(new StateController(new StateModel(connection))));
    app.use('/api/v1/category', createRouterCategory(new CategoryController(new CategoryModel(connection))));
    app.use('/api/v1/clashes', createRouterClashes(new ClashesController(new ClashesModel(connection))));

    const port = PORT || 3000;

    app.listen(port, () => {
      console.log(`Run server  http://localhost::${port}`)
    })


  } catch (error) {
    console.error(error);
  }



})();



