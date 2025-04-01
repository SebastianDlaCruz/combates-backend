import { Router } from "express";
import { StateBoxerController } from "../../controllers/state-boxer/state-boxer.model";

export const createRouterStateBoxer = (controller: StateBoxerController) => {

  const router = Router();

  router.get('/', (req, res) => {
    controller.getAll(req, res);
  });

  return router;
}