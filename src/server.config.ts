import cors from 'cors';
import { PoolConnection } from "mysql2/promise";
import { BoxerController } from "./controllers/boxer/boxer.controller";
import { ClashesParticipantsController } from './controllers/clashes-participants/clashes-participants.controller';
import { ClashesController } from "./controllers/clashes/clashes.controller";
import { CoachController } from "./controllers/coach/coach.controller";
import { SchoolController } from "./controllers/school/school.controller";
import { StateController } from "./controllers/state/state.controller";
import { IMain } from "./lib/interfaces/main.interface";
import { getConnectionDB } from "./lib/utils/connection-db.util";
import { BoxerModel } from "./models/boxer/boxer.model";
import { ClashesParticipantsModel } from './models/clashes-participants/clashes-participants.model';
import { ClashesModel } from "./models/clashes/clashes.model";
import { CoachModel } from "./models/couch/coach.model";
import { SchoolModel } from "./models/school/school.model";
import { StateModel } from "./models/state/state.model";
import { createRouterBoxer } from "./routers/boxer/boxer-route";
import { createRouterClashesParticipants } from './routers/clashes-participants/clashes-participants.route';
import { createRouterClashes } from "./routers/clashes/clashes.route";
import { createRouterCoach } from "./routers/coach/coach-route";
import { createRouterSchool } from "./routers/school/school-route";
import { createRouterState } from "./routers/state/state.route";

const path = '/api/v1';

export const configMain: IMain<PoolConnection> = {
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

      path: `${path}/state`,
      controller: StateController,
      model: StateModel,
      generateRouter: createRouterState,
    },
    {

      path: `${path}/clashes-participants`,
      controller: ClashesParticipantsController,
      model: ClashesParticipantsModel,
      generateRouter: createRouterClashesParticipants,
    }

  ],
  textRunServer: `Run server  http://127.0.0.1`
}
