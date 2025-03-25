import { Router } from "express";
import { ClashesParticipantsController } from "../../controllers/clashes-participants/clashes-participants.controller";

export const createClashesParticipants = (controller: ClashesParticipantsController) => {

  const routerClashesParticipants = Router();

  return routerClashesParticipants;
}