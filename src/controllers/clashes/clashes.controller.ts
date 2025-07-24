import { Request, Response } from "express";
import { clashesSchema } from "../../lib/schemas/clashes-schema";
import { validateSchema } from "../../lib/utils/validate-body.util";
import { Clashes, ClashesCrud } from "../../models/clashes/clashes.interface";

export class ClashesController {

  private clashes: ClashesCrud;
  constructor(clashes: ClashesCrud) {
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

    const result = await this.clashes.getAll({
      page: page?.toString(),
      pageSize: pageSize?.toString()
    });

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