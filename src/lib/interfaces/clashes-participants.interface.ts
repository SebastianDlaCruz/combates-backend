import { ClashesParticipants } from "../../models/clashes-participants/clashes-participants.model";
import { ICreate, IDelete, IUpdate } from "./crud.interface";
import { ResponseRequest } from "./response-request.interface";

export interface IClashesParticipants extends ICreate<ClashesParticipants>, IUpdate<ClashesParticipants>, IDelete {

  getAll(id_category: number): Promise<ResponseRequest>;

} 