export interface IAPPError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
}
