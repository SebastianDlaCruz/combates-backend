import { Router } from "express";
import { CoachController } from "../../controllers/coach/coach.controller";


export const createRouterCoach = (coachController: CoachController) => {
  const coachRouter = Router();


  coachRouter.get('/', (req, res) => {
    coachController.getAll(req, res);
  });

  coachRouter.get('/:id', (req, res) => {
    coachController.getCoach(req, res);
  })

  coachRouter.post('/', (req, res) => {
    coachController.create(req, res);
  });

  coachRouter.delete('/:id', (req, res) => {
    coachController.delete(req, res);
  });

  coachRouter.patch('/:id', (req, res) => {
    coachController.update(req, res);
  });

  return coachRouter;

}

