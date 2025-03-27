import { Request, Response } from "express";
import { clashesParticipants } from "../../lib/schemas/clashes-participants.schema";
import { validateSchema } from "../../lib/utils/validate-body.util";
import { ClashesParticipants, ClashesParticipantsModel } from "../../models/clashes-participants/clashes-participants.model";
export class ClashesParticipantsController {

  private model: ClashesParticipantsModel;
  constructor(model: ClashesParticipantsModel) {
    this.model = model;
  }

  async getAll(req: Request, res: Response) {

    const { id_category } = req.query;

    const result = await this.model.getAll(parseInt(id_category?.toString() ?? ''));

    res.status(result.statusCode);
    res.json(result);

  }

  async create(req: Request, res: Response) {


    const valid = validateSchema(clashesParticipants, req.body);

    if (valid.error) {

      res.status(400);
      res.json(
        {
          error: JSON.parse(valid.error.message)
        }
      );

    }


    if (valid.success) {

      const result = await this.model.create(valid.data as ClashesParticipants);

      res.status(result.statusCode);
      res.json(result);

    }

  }


  async update(req: Request, res: Response) {

    const { id } = req.params;

    const valid = validateSchema(clashesParticipants, req.body);

    if (valid.error) {

      res.status(400);
      res.json(
        {
          error: JSON.parse(valid.error.message)
        }
      );

    }


    if (valid.success) {

      const result = await this.model.update(parseInt(id?.toString() ?? ''), valid.data as ClashesParticipants);

      res.status(result.statusCode);
      res.json(result);

    }


  }


  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.model.delete(parseInt(id?.toString() ?? ''));

    res.status(result.statusCode);
    res.json(result);

  }

}