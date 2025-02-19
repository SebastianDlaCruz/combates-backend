import { Router } from "express";
import { CoachController } from "../controllers/coach/coach.controller";
import { CoachModel } from "../models/couch/coach.model";

export const coachRouter = Router();

const coachModel = new CoachModel();
const coachController = new CoachController(coachModel);


coachRouter.post('/', (req, res) => {
  coachController.create(req, res);
});

coachRouter.get('/', (req, res) => {
  coachController.getAll(req, res);
})

