import { PoolConnection } from "mysql2/promise";
import { BoxerController } from "./controllers/boxer/boxer.controller";
import { ClashesController } from "./controllers/clashes/clashes.controller";
import { CoachController } from "./controllers/coach/coach.controller";
import { SchoolController } from "./controllers/school/school.controller";
import { StateController } from "./controllers/state/state.controller";
import { IMain } from "./interfaces/main.interface";
import { BoxerModel } from "./models/boxer/boxer.model";
import { ClashesModel } from "./models/clashes/clashes.model";
import { CoachModel } from "./models/couch/coach.model";
import { SchoolModel } from "./models/school/school.model";
import { StateModel } from "./models/state/state.model";
import { createRouterBoxer } from "./routers/boxer/boxer-route";
import { createRouterClashes } from "./routers/clashes/clashes.route";
import { createRouterCoach } from "./routers/coach/coach-route";
import { createRouterSchool } from "./routers/school/school-route";
import { createRouterState } from "./routers/state/state.route";
import { getConnectionDB } from "./utils/connection-db.util";

export const configMain: IMain<PoolConnection> = {
  port: 3000,
  connectionMethod: getConnectionDB,
  providerRouter: [
    {
      path: '/api/v1/boxer',
      controller: BoxerController,
      model: BoxerModel,
      generateRouter: createRouterBoxer,
    },
    {
      path: '/api/v1/coach',
      controller: CoachController,
      model: CoachModel,
      generateRouter: createRouterCoach,
    },
    {
      path: '/api/v1/school',
      controller: SchoolController,
      model: SchoolModel,
      generateRouter: createRouterSchool,
    }, {
      path: '/api/v1/clashes',
      controller: ClashesController,
      model: ClashesModel,
      generateRouter: createRouterClashes,
    }, {

      path: '/api/v1/state',
      controller: StateController,
      model: StateModel,
      generateRouter: createRouterState,

    }

  ],
  textRunServer: `Run server  http://127.0.0.1`
}
