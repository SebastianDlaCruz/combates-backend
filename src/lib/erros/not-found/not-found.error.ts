import { CustomError } from "../custom-error/custom.error";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message ?? 'Recurso no encontrado', 404);
  }

}