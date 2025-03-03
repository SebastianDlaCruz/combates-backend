import { Router } from "express";
import { ClashesController } from "../controllers/clashes/clashes.controller";


export const createRouterClashes = (clashesController: ClashesController) => {

  const clashesRouter = Router();

  clashesRouter.get('/', (req, res) => {
    clashesController.getAll(req, res);
  });

  clashesRouter.get('/:id/:id_state', (req, res) => {
    clashesController.updateState(req, res);
  });

  clashesRouter.post('/', (req, res) => {
    clashesController.create(req, res);
  });

  return clashesRouter;
}