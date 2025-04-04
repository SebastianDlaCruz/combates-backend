import { Request, Response } from "express";
import { IStateBoxer } from "../../lib/interfaces/state-boxer.interface";

export interface StateBoxer {
  id: number;
  name: string;
}


export class StateBoxerController {

  private model: IStateBoxer;

  constructor(model: IStateBoxer) {
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