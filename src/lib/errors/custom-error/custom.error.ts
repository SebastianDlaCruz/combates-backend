import { CodeErrors } from "../../const/code-errors.const";

export class CustomError extends Error {

  message: string;
  statusCode: number;
  code: CodeErrors;

  constructor(message: string, statusCode: number, code: CodeErrors) {
    super(message);
    this.message = message || 'error';
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }

}