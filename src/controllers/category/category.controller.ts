import { Request, Response } from "express";
import { ICategory } from "../../interfaces/category.interface";
import { Category } from "../../models/category/category.model";
import { categorySchema } from "../../schemas/categoty-schema";
import { validateSchema } from "../../utils/validate-body.util";

export class CategoryController {

  private category: ICategory;

  constructor(category: ICategory) {
    this.category = category;
  }

  async create(req: Request, res: Response) {

    const validate = validateSchema(categorySchema, req.body);

    if (validate.error) {
      res.status(400);
      res.json(
        { error: JSON.parse(validate.error.message) }
      )
    }

    if (validate.success) {
      const result = await this.category.create(validate.data as Category);

      res.status(result.statusCode);
      res.json(result);

    }

  }

  async getAll(req: Request, res: Response) {
    const result = await this.category.getAll();
    res.status(result.statusCode);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const validate = validateSchema(categorySchema, req.body);

    if (validate.error) {
      res.status(400);
      res.json(
        { error: JSON.parse(validate.error.message) }
      )
    }

    if (validate.success) {
      const result = await this.category.update(id, validate.data as Category);

      res.status(result.statusCode);
      res.json(result);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.category.delete(parseInt(id));
    res.status(result.statusCode);
    res.json(result);
  }

  async getCategory(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.category.getCategory(parseInt(id));
    res.status(result.statusCode);
    res.json(result);
  }

}