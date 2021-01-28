export interface IAPPError extends Error {
  statusCode: number;
  message: string;
  status: string;
  isOperational: boolean;
}
