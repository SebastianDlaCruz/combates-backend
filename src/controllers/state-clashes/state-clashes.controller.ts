import { Request, Response } from "express";
import { StateClashesCrud } from "../../models/state-clashes/state-clashes.interface";

export class StateClashesController {

  private state: StateClashesCrud;

  constructor(state: StateClashesCrud) {
    this.state = state;
  }

  async getAll(req: Request, res: Response) {
    const result = await this.state.getAll();
    res.status(result.statusCode);
    res.json(result);

  };

  async getStateClashes(req: Request, res: Response) {

    const { id } = req.params;

    const result = await this.state.getStateClashes(parseInt(id));
    res.status(result.statusCode);
    res.json(result);

  };


}