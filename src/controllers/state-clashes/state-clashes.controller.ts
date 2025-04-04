import { Request, Response } from "express";
import { IStateClashes } from "../../lib/interfaces/state-clashes.intereface";

export class StateClashesController {

  private state: IStateClashes;

  constructor(state: IStateClashes) {
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