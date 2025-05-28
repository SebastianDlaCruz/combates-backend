import { CustomError } from "../custom-error/custom.error";

export class InternalServerError extends CustomError {
  constructor(message?: string) {
    super(message || 'Error del servidor', 500);
  }
}