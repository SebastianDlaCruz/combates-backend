import { Router } from "express";
import { StateClashesController } from "../../controllers/state-clashes/state-clashes.controller";

export const createRouterClash = (controller: StateClashesController) => {

  const router = Router();

  router.get('/', (req, res) => {
    controller.getAll(req, res);
  });

  return router;
}