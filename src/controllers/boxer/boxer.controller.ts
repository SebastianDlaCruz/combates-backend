import { Request, Response } from "express";
import { IBoxer } from "../../interfaces/boxer.interface";
import { Boxer } from "../../models/boxer/boxer.model";
import { boxerSchema } from "../../schemas/boxer-schema";
import { validateSchema } from "../../utils/validate-body.util";

export class BoxerController {
  private boxer: IBoxer;

  constructor(boxer: IBoxer) {
    this.boxer = boxer;
  }

  async getAll(req: Request, res: Response) {
    const { page, pageSize } = req.query;
    const boxers = await this.boxer.getAll(page?.toString(), pageSize?.toString());
    res.status(boxers.statusCode);
    res.json(boxers);

  }

  async create(req: Request, res: Response) {
    const result = validateSchema(boxerSchema, req.body);
    if (result.error) {
      res.status(400);
      res.json({
        error: JSON.parse(result.error.message)
      })
    }

    if (result.success) {
      const response = await this.boxer.create(result.data as Boxer);
      res.status(response.statusCode);
      res.json(response);
    }

  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.boxer.delete(id);
    res.status(result.statusCode);
    res.json(result)
  }

  async updateState(req: Request, res: Response) {
    const { id, idState } = req.params;
    const result = await this.boxer.updateState(id, parseInt(idState));
    res.status(result.statusCode);
    res.json(result);
  }

  async getBoxer(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.boxer.getBoxer(id);

    res.status(result.statusCode);
    res.json(result);
  }

  async update(req: Request, res: Response) {

    const result = validateSchema(boxerSchema, req.body);

    if (result.error) {
      res.status(400);
      res.json({
        error: JSON.parse(result.error.message)
      })
    }

    if (result.success) {

      const { id } = req.params;

      const response = await this.boxer.update(id, result.data as Boxer);
      res.status(response.statusCode);
      res.json(response);

    }
  }

}