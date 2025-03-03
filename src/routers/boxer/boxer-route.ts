import { Router } from "express";
import { BoxerController } from "../../controllers/boxer/boxer.controller";


export const createRouterBoxer = (boxerController: BoxerController) => {

  const router = Router();

  router.get('/', (req, res) => {
    boxerController.getAll(req, res);
  });

  router.get('/:id', (req, res) => {
    boxerController.getBoxer(req, res);
  });

  router.post('/', (req, res) => {
    boxerController.create(req, res);
  });

  router.delete('/:id', (req, res) => {
    boxerController.delete(req, res);
  });

  router.patch('/:id/state/:idState', (req, res) => {
    boxerController.updateState(req, res)
  })


  router.patch('/:id', (req, res) => {
    boxerController.update(req, res)
  });


  router.patch('/category/:id', (req, res) => {
    boxerController.getByCategory(req, res);
  });

  return router;
}