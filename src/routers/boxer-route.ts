import { Router } from "express";
import { BoxerController } from "../controllers/boxer/boxer.controller";
import { BoxerModel } from "../models/boxer/boxer.model";

export const routerBoxer = Router();

const boxerModel = new BoxerModel();
const boxerController = new BoxerController(boxerModel);

routerBoxer.get('/', (req, res) => {
  boxerController.getAll(req, res);
});

routerBoxer.post('/', (req, res) => {
  boxerController.create(req, res);
});

routerBoxer.delete('/:id', (req, res) => {
  boxerController.delete(req, res);
});

routerBoxer.patch('/:id/:idState', (req, res) => {
  boxerController.updateState(req, res)
})