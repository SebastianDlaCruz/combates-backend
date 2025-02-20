import { Request, Response } from "express";
import { ICrud } from "../../interfaces/crud.interface";
import { State } from "../../models/state/state.model";
import { stateSchema } from "../../schemas/state-schema";
import { validateSchema } from "../../utils/validate-body.util";

export class StateController {
  private state: ICrud<State>;

  constructor(state: ICrud<State>) {
    this.state = state;
  }

  async getAll(req: Request, res: Response) {
    const result = await this.state.getAll();
    res.status(result.statusCode);
    res.json(result);
  }

  async create(req: Request, res: Response) {

    const validate = validateSchema(stateSchema, req.body);

    if (validate.error) {
      res.status(500);
      res.json({
        error: JSON.parse(validate.error.message)
      })
    }

    if (validate.success) {
      const result = await this.state.create(validate.data as State);
      res.status(result.statusCode);
      res.json(result);
    }
  }

  async update(req: Request, res: Response) {

    const validate = validateSchema(stateSchema, req.body);

    if (validate.error) {
      res.status(500);
      res.json({
        error: JSON.parse(validate.error.message)
      })
    }

    if (validate.success) {

      const { id } = req.params;

      const result = await this.state.update(id, validate.data as State);
      res.status(result.statusCode);
      res.json(result);
    }
  }

}