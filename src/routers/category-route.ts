import { Router } from "express";
import { CategoryController } from "../controllers/category/category.controller";
import { CategoryModel } from "../models/category/category.model";

export const categoryRouter = Router();

const categoryModel = new CategoryModel();
const categoryController = new CategoryController(categoryModel);

categoryRouter.get('/', (req, res) => {
  categoryController.getAll(req, res);
});

categoryRouter.post('/', (req, res) => {
  categoryController.create(req, res);
});

categoryRouter.patch('/', (req, res) => {
  categoryController.update(req, res);
})