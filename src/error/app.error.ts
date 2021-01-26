import { IAPPError } from "../core/interfaces/base.appError";

export class APPError extends Error implements IAPPError {
  statusCode: number;
  message: string;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }

  public static create(message: string, statusCode: number) {
    if (!message || !statusCode) {
      throw new Error("please define all value for App error class");
    }
    return new APPError(message, statusCode);
  }
}
