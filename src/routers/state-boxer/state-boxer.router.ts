import { Router } from "express";
import { StateBoxerController } from "../../controllers/state-boxer/state-boxer.model";

export const createRouterStateBoxer = (controller: StateBoxerController) => {

  const router = Router();

  router.get('/', (req, res) => {
    controller.getAll(req, res);
  });

  router.get('/:id', (req, res) => {
    controller.getStateBoxer(req, res);
  })

  return router;
}