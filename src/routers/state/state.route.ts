import { Router } from "express";
import { StateController } from "../../controllers/state/state.controller";

export const createRouterState = (stateController: StateController) => {

  const stateRouter = Router();


  stateRouter.get('/', (req, res) => {
    stateController.getAll(req, res);
  });

  stateRouter.post('/', (req, res) => {
    stateController.create(req, res);
  });

  stateRouter.patch('/', (req, res) => {
    stateController.update(req, res);
  });

  return stateRouter;
};
