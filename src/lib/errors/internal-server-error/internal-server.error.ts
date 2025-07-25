import { CodeErrors } from "../../const/code-errors.const";
import { CustomError } from "../custom-error/custom.error";

export class InternalServerError extends CustomError {
  constructor(message?: string, code: CodeErrors = CodeErrors.INTERNAL_SERVER_ERROR) {
    super(message || 'Error del servidor', 500, code);
  }
}