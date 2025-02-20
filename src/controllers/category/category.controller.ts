import { Request, Response } from "express";
import { ICrud } from "../../interfaces/crud.interface";
import { Category } from "../../models/category/category.model";
import { categorySchema } from "../../schemas/categoty-schema";
import { validateSchema } from "../../utils/validate-body.util";

export class CategoryController {

  private category: ICrud<Category>;

  constructor(category: ICrud<Category>) {
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

}