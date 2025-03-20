import { Router } from "express";
import { BoxerController } from "../../controllers/boxer/boxer.controller";


export const createRouterBoxer = (boxerController: BoxerController) => {

  const routerBoxer = Router();

  routerBoxer.get('/', (req, res) => {
    console.log('/')
    boxerController.getAll(req, res);
  });

  routerBoxer.get('/search', (req, res) => {
    boxerController.search(req, res);
  });

  routerBoxer.get('/:id', (req, res) => {
    boxerController.getBoxer(req, res);
  });


  routerBoxer.post('/', (req, res) => {
    boxerController.create(req, res);
  });

  routerBoxer.delete('/:id', (req, res) => {
    boxerController.delete(req, res);
  });

  routerBoxer.put('/:id', (req, res) => {
    boxerController.updateState(req, res)
  });


  routerBoxer.patch('/:id', (req, res) => {
    boxerController.update(req, res)
  });


  routerBoxer.patch('/category/:id', (req, res) => {
    boxerController.getByCategory(req, res);
  });


  routerBoxer.put('/corner/:id', (req, res) => {
    boxerController.updateCorner(req, res);
  });



  return routerBoxer;
}