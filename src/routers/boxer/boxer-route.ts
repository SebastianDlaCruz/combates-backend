import { Router } from "express";
import { BoxerController } from "../../controllers/boxer/boxer.controller";
import { asyncWrapper } from "../../lib/utils/async-wrapper/async-wrapper.util";


export const createRouterBoxer = (boxerController: BoxerController) => {

  const routerBoxer = Router();

  routerBoxer.get('/', (req, res, next) => asyncWrapper(boxerController.getAll.bind(boxerController))(req, res, next));

  routerBoxer.get('/search', (req, res, next) => asyncWrapper(boxerController.search.bind(boxerController))(req, res, next));


  routerBoxer.get('/:id', (req, res, next) => asyncWrapper(boxerController.getBoxer.bind(boxerController))(req, res, next));

  routerBoxer.post('/', (req, res, next) => asyncWrapper(boxerController.create.bind(boxerController))(req, res, next));

  routerBoxer.delete('/:id', (req, res, next) => asyncWrapper(boxerController.delete.bind(boxerController))(req, res, next));

  routerBoxer.put('/:id', (req, res, next) => asyncWrapper(boxerController.updateState.bind(boxerController))(req, res, next));


  routerBoxer.patch('/:id', (req, res, next) => asyncWrapper(boxerController.update.bind(boxerController))(req, res, next));


  routerBoxer.put('/corner/:id', (req, res, next) => asyncWrapper(boxerController.updateCorner.bind(boxerController))(req, res, next));



  return routerBoxer;
}