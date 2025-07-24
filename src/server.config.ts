import cors from 'cors';
import { PoolConnection } from "mysql2/promise";
import { BoxerController } from "./controllers/boxer/boxer.controller";
import { CategoryController } from './controllers/category/category.controller';
import { ClashesParticipantsController } from './controllers/clashes-participants/clashes-participants.controller';
import { ClashesController } from "./controllers/clashes/clashes.controller";
import { CoachController } from "./controllers/coach/coach.controller";
import { SchoolController } from "./controllers/school/school.controller";
import { StateBoxerController } from './controllers/state-boxer/state-boxer.model';
import { StateClashesController } from "./controllers/state-clashes/state-clashes.controller";
import { Main } from "./lib/interfaces/main.interface";
import { getConnectionDB } from "./lib/utils/connection-db.util";
import { BoxerModel } from "./models/boxer/boxer.model";
import { CategoryModel } from './models/category/category.model';
import { ClashesParticipantsModel } from './models/clashes-participants/clashes-participants.model';
import { ClashesModel } from "./models/clashes/clashes.model";
import { CoachModel } from "./models/couch/coach.model";
import { SchoolModel } from "./models/school/school.model";
import { StateBoxerModel } from './models/state-boxer/state-boxer.model';
import { StateClashesModel } from "./models/state-clashes/state-clashes.model";
import { createRouterBoxer } from "./routers/boxer/boxer.router";
import { createRouterCategory } from './routers/category/category.router';
import { createRouterClashesParticipants } from './routers/clashes-participants/clashes-participants.router';
import { createRouterClashes } from "./routers/clashes/clashes.router";
import { createRouterCoach } from "./routers/coach/coach.router";
import { createRouterSchool } from "./routers/school/school.router";
import { createRouterStateClashes } from "./routers/state-clashes/state-clashes.router";

const path = '/api/v1';

export const configMain: Main<PoolConnection> = {
  port: 3000,
  connectionMethod: getConnectionDB,
  corsMethod: cors,
  providerRouter: [
    {
      path: `${path}/boxer`,
      controller: BoxerController,
      model: BoxerModel,
      generateRouter: createRouterBoxer,
    },
    {
      path: `${path}/category`,
      controller: CategoryController,
      model: CategoryModel,
      generateRouter: createRouterCategory,
    },
    {
      path: `${path}/coach`,
      controller: CoachController,
      model: CoachModel,
      generateRouter: createRouterCoach,
    },
    {
      path: `${path}/school`,
      controller: SchoolController,
      model: SchoolModel,
      generateRouter: createRouterSchool,
    }, {
      path: `${path}/clashes`,
      controller: ClashesController,
      model: ClashesModel,
      generateRouter: createRouterClashes,
    }, {

      path: `${path}/state-clashes`,
      controller: StateClashesController,
      model: StateClashesModel,
      generateRouter: createRouterStateClashes,
    },
    {

      path: `${path}/clashes-participants`,
      controller: ClashesParticipantsController,
      model: ClashesParticipantsModel,
      generateRouter: createRouterClashesParticipants,
    },
    {
      path: `${path}/state-boxer`,
      controller: StateBoxerController,
      model: StateBoxerModel,
      generateRouter: createRouterBoxer
    }

  ],
  textRunServer: `Run server  http://127.0.0.1`
}
