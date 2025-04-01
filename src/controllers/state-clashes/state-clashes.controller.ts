import { Request, Response } from "express";
import { IGetAll } from "../../lib/interfaces/crud.interface";

export class StateClashesController {

  private state: IGetAll;

  constructor(state: IGetAll) {
    this.state = state;
  }

  async getAll(req: Request, res: Response) {
    const result = await this.state.getAll();
    res.status(result.statusCode);
    res.json(result);

  };


}