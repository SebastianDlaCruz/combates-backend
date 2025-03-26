import { Request, Response } from "express";
import { IClashes } from "../../lib/interfaces/clashes.interface";
import { clashesSchema } from "../../lib/schemas/clashes-schema";
import { validateSchema } from "../../lib/utils/validate-body.util";
import { Clashes } from "../../models/clashes/clashes.model";

export class ClashesController {

  private clashes: IClashes;
  constructor(clashes: IClashes) {
    this.clashes = clashes;
  }

  async create(req: Request, res: Response) {

    const validator = validateSchema(clashesSchema, req.body);

    if (validator.error) {
      res.status(400),
        res.json({
          error: JSON.parse(validator.error.message)
        })
    }

    if (validator.success) {
      const result = await this.clashes.create(validator.data as Clashes);
      res.status(result.statusCode);
      res.json(result);

    }
  }


  async getAll(req: Request, res: Response) {

    const { page, pageSize } = req.query;

    const result = await this.clashes.getAll(page?.toString(), pageSize?.toString());

    res.status(result.statusCode);
    res.json(result);
  }

  async updateState(req: Request, res: Response) {

    const { id, id_state } = req.params;

    const result = await this.clashes.updateState(parseInt(id), parseInt(id_state));

    res.status(result.statusCode);
    res.json(result);
  }

  async update(req: Request, res: Response) {

    const { id } = req.params;

    const validator = validateSchema(clashesSchema, req.body);

    if (validator.error) {
      res.status(400);
      res.json({
        error: JSON.parse(validator.error.message)
      })
    }

    if (validator.success) {
      const result = await this.clashes.update(parseInt(id), validator.data as Clashes);

      res.status(result.statusCode);
      res.json(result);
    }

  }

}