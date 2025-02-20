import { Request, Response } from "express";
import { ISchool } from "../../interfaces/school.interface";
import { School } from "../../models/school/school.model";
import { schoolSchema } from "../../schemas/school-schema";
import { validateSchema } from "../../utils/validate-body.util";

export class SchoolController {
  private school: ISchool;

  constructor(school: ISchool) {
    this.school = school;
  }

  async create(req: Request, res: Response) {

    const validate = validateSchema(schoolSchema, req.body);

    if (validate.error) {

      res.status(400);
      res.json({
        error: JSON.parse(validate.error.message)
      });

    }

    if (validate.success) {
      const result = await this.school.create(validate.data as School);
      res.status(result.statusCode);
      res.json(result);
    }
  }

  async getAll(req: Request, res: Response) {
    const result = await this.school.getAll();
    res.status(result.statusCode);
    res.json(result);
  }

  async getSchool(req: Request, res: Response) {

    const { id } = req.params;
    const result = await this.school.getSchool(parseInt(id));

    res.status(result.statusCode);
    res.json(result);
  }

  async delete(req: Request, res: Response) {

    const { id } = req.params;
    const result = await this.school.delete(parseInt(id));

    res.status(result.statusCode);
    res.json(result);
  }

  async update(req: Request, res: Response) {

    const validate = validateSchema(schoolSchema, req.body);

    if (validate.error) {

      res.status(400);
      res.json({
        error: JSON.parse(validate.error.message)
      });

    }

    if (validate.success) {
      const { id } = req.params
      const result = await this.school.update(id, validate.data as School);
      res.status(result.statusCode);
      res.json(result);
    }
  }

}