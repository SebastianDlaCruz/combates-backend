import { CodeErrors } from "../../const/code-errors.const";
import { CustomError } from "../custom-error/custom.error";

export class NotFoundError extends CustomError {
  constructor(message: string, code: CodeErrors = CodeErrors.NOT_FOUND) {
    super(message ?? 'Recurso no encontrado', 404, code);
  }

}