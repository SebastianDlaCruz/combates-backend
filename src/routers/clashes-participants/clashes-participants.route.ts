import { Router } from "express";
import { ClashesParticipantsController } from "../../controllers/clashes-participants/clashes-participants.controller";

export const createRouterClashesParticipants = (controller: ClashesParticipantsController) => {

  const routerClashesParticipants = Router();

  routerClashesParticipants.get('/', (req, res) => {
    controller.getAll(req, res);
  });

  routerClashesParticipants.post('/', (req, res) => {
    controller.create(req, res);
  });

  routerClashesParticipants.patch('/:id', (req, res) => {
    controller.update(req, res);
  });

  routerClashesParticipants.delete('/:id', (req, res) => {
    controller.delete(req, res);
  });

  return routerClashesParticipants;
}