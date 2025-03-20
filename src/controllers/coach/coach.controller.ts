import { Request, Response } from "express";
import { ICoach } from "../../interfaces/coach.interface";
import { Coach } from "../../models/couch/coach.model";
import { coachSchema } from "../../schemas/coach-schema";
import { validateSchema } from "../../utils/validate-body.util";

export class CoachController {
  private coach: ICoach;
  constructor(coach: ICoach) {
    this.coach = coach;
  }

  async create(req: Request, res: Response) {
    const validate = validateSchema(coachSchema, req.body);

    if (validate.error) {
      res.status(400);
      res.json({
        error: JSON.parse(validate.error.message)
      })
    }

    if (validate.success) {
      const result = await this.coach.create(validate.data as Coach);
      res.status(result.statusCode);
      res.json(result);
    }
  }

  async getAll(req: Request, res: Response) {

    const { page, pageSize } = req.query;

    const result = await this.coach.getAll(page?.toString(), pageSize?.toString());
    res.status(result.statusCode);
    res.json(result);

  }

  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.coach.delete(id);
    res.status(result.statusCode);
    res.json(result);
  }

  async update(req: Request, res: Response) {

    const { id } = req.params;

    const validate = validateSchema(coachSchema, req.body);

    if (validate.error) {
      res.status(400);
      res.json({
        error: JSON.parse(validate.error.message)
      })
    }


    if (validate.success) {
      const result = await this.coach.update(id, validate.data as Coach);

      res.status(result.statusCode);
      res.json(result);
    }
  }

}