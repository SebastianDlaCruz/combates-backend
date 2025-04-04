import { Router } from "express";
import { StateClashesController } from "../../controllers/state-clashes/state-clashes.controller";

export const createRouterStateClashes = (stateController: StateClashesController) => {

  const stateRouter = Router();

  stateRouter.get('/', (req, res) => {
    stateController.getAll(req, res);
  });

  stateRouter.get('/:id', (req, res) => {
    stateController.getStateClashes(req, res);
  });

  return stateRouter;

};
