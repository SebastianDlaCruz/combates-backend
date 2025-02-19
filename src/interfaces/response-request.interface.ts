export interface ResponseRequest {
  statusCode: number;
  success: boolean;
  data?: unknown;
  message: string;
  error?: any;
}