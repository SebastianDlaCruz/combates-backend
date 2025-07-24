import { Router } from "express";
import { CategoryController } from "../../controllers/category/category.controller";

export const createRouterCategory = (categoryController: CategoryController) => {

  const categoryRouter = Router();

  categoryRouter.get('/', (req, res) => {
    categoryController.getAll(req, res);
  });

  categoryRouter.get('/:id', (req, res) => {
    categoryController.getCategory(req, res);
  });

  categoryRouter.post('/', (req, res) => {
    categoryController.create(req, res);
  });

  categoryRouter.patch('/:id', (req, res) => {
    categoryController.update(req, res);
  });

  categoryRouter.delete('/:id', (req, res) => {
    categoryController.delete(req, res);
  });

  return categoryRouter;
}
