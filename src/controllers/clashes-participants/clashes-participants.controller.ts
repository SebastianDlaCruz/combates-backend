import { Request, Response } from "express";
import { clashesParticipants } from "../../lib/schemas/clashes-participants.schema";
import { validateSchema } from "../../lib/utils/validate-body.util";
import { ClashesParticipantsCrud } from "../../models/clashes-participants/clashes-participants.interface";
import { ClashesParticipants } from "../../models/clashes-participants/clashes-participants.model";
export class ClashesParticipantsController {

  private model: ClashesParticipantsCrud;
  constructor(model: ClashesParticipantsCrud) {
    this.model = model;
  }

  async getAll(req: Request, res: Response) {

    const result = await this.model.getAll({
      id_category: parseInt(req.query.id_category?.toString() ?? '')
    });

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


  async getClashesParticipants(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.model.getClashesParticipants(parseInt(id?.toString() ?? ''));

    res.status(result.statusCode);
    res.json(result);

  }

}