import { Request, Response } from "express";
import { coachSchema } from "../../lib/schemas/coach-schema";
import { validateSchema } from "../../lib/utils/validate-body.util";
import { Coach, CoachCrud } from "../../models/couch/couch.interface";

export class CoachController {
  private coach: CoachCrud;
  constructor(coach: CoachCrud) {
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

    const result = await this.coach.getAll({
      page: page?.toString(),
      pageSize: pageSize?.toString()
    });

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

  async getCoach(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.coach.getCoach(parseInt(id));

    res.status(result.statusCode);
    res.json(result);
  }

}