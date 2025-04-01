import { Request, Response } from "express";
import { IGetAll } from "../../lib/interfaces/crud.interface";

export interface StateBoxer {
  id: number;
  name: string;
}


export class StateBoxerController {

  private model: IGetAll;

  constructor(model: IGetAll) {
    this.model = model;
  }

  async getAll(req: Request, res: Response) {

    const result = await this.model.getAll();

    res.status(result.statusCode);
    res.json(result);
  }


}