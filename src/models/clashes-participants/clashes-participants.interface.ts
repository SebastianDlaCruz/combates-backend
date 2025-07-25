import { RowDataPacket } from "mysql2";
import { Crud } from "../../lib/interfaces/crud.interface";
import { ResponseRequest } from "../../lib/interfaces/response-request.interface";

export interface ClashesParticipants {
  id: number;
  id_boxer: string;
  id_clashes: number;
}

export interface ClashesParticipantsCreateFilters {
  id_category: number;
}

export type ClashesParticipantsUpdateQuery = ClashesParticipants & RowDataPacket;

export interface ClashesParticipantsCrud extends Crud<ClashesParticipants, ClashesParticipantsCreateFilters> {

  getAll(filters: ClashesParticipantsCreateFilters): Promise<ResponseRequest>;
  getClashesParticipants(id_clashes: number): Promise<ResponseRequest>
} 