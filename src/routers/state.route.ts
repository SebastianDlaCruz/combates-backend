import { Router } from "express";
import { StateController } from "../controllers/state/state.controller";
import { StateModel } from "../models/state/state.model";

export const stateRouter = Router();

const stateModel = new StateModel();
const stateController = new StateController(stateModel);

stateRouter.get('/', (req, res) => {
  stateController.getAll(req, res);
})

stateRouter.post('/', (req, res) => {
  stateController.create(req, res);
})

stateRouter.patch('/', (req, res) => {
  stateController.update(req, res);
})