import { Router } from "express";
import { CategoryController } from "../../controllers/category/category.controller";

export const createRouterCategory = (categoryController: CategoryController) => {

  const categoryRouter = Router();

  categoryRouter.get('/', (req, res) => {
    categoryController.getAll(req, res);
  });

  categoryRouter.post('/', (req, res) => {
    categoryController.create(req, res);
  });

  categoryRouter.patch('/', (req, res) => {
    categoryController.update(req, res);
  });

  return categoryRouter;
}
