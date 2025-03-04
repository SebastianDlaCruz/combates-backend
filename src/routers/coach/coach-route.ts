import { Router } from "express";
import { CoachController } from "../../controllers/coach/coach.controller";


export const createRouterCoach = (coachController: CoachController) => {
  const coachRouter = Router();

  coachRouter.post('/', (req, res) => {
    coachController.create(req, res);
  });

  coachRouter.get('/', (req, res) => {
    coachController.getAll(req, res);
  })

  return coachRouter;

}

