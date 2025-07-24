import { NextFunction, Request, Response } from "express";
import { boxerSchema } from "../../lib/schemas/boxer-schema";
import { validateSchema } from "../../lib/utils/validate-body.util";
import { Boxer, BoxerCrud } from "../../models/boxer/boxer.interface";


export class BoxerController {
  private boxer: BoxerCrud;

  constructor(boxer: BoxerCrud) {
    this.boxer = boxer;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {

    const { page, pageSize } = req.query;

    const boxers = await this.boxer.getAll(
      {
        page: page?.toString(),
        pageSize: pageSize?.toString()
      }
    );


    res.status(boxers.statusCode || 200).json(boxers);

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
    res.json(result);
  }

  async updateState(req: Request, res: Response) {
    const { id } = req.params;
    const { state } = req.body;

    const result = await this.boxer.updateState(id, { state: parseInt(state) });
    res.status(result.statusCode);
    res.json(result);
  }

  async getBoxer(req: Request, res: Response, next: NextFunction) {

    try {

      const { id } = req.params;
      const result = await this.boxer.getBoxer(id);

      res.status(result.statusCode);
      res.json(result);

    } catch (error) {
      next(error);
    }
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


  async updateCorner(req: Request, res: Response) {

    const { id } = req.params;
    const { corner } = req.body;

    const result = await this.boxer.updateCorner(id, { corner });

    res.status(result.statusCode);
    res.json(result);
  }


  async search(req: Request, res: Response) {

    const { id_category, name } = req.query;

    const result = await this.boxer.search({
      id_category: parseInt(id_category?.toString() ?? ''),
      name: name?.toString()
    });

    res.status(result.statusCode);
    res.json(result);
  }
}