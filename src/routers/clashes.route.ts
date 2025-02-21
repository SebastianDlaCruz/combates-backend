import { Router } from "express";
import { ClashesController } from "../controllers/clashes/clashes.controller";
import { ClashesModel } from "../models/clashes/clashes.model";

export const clashesRouter = Router();

const clashesModel = new ClashesModel();
const clashesController = new ClashesController(clashesModel);

clashesRouter.get('/', (req, res) => {
  clashesController.getAll(req, res);
});

clashesRouter.get('/:id/:id_state', (req, res) => {
  clashesController.updateState(req, res);
});

clashesRouter.post('/', (req, res) => {
  clashesController.create(req, res);
});