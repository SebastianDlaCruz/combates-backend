import { Request, Response } from "express";
import { StateBoxerCrud } from "../../models/state-boxer/state-boxer.interface";


export class StateBoxerController {

  private model: StateBoxerCrud;

  constructor(model: StateBoxerCrud) {
    this.model = model;
  }

  async getAll(req: Request, res: Response) {

    const result = await this.model.getAll();

    res.status(result.statusCode);
    res.json(result);

  }

  async getStateBoxer(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.model.getStateBoxer(parseInt(id));

    res.status(result.statusCode);
    res.json(result);

  }


}