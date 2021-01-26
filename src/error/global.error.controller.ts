import { Request, Response, NextFunction } from "express";
import { IAPPError } from "../core/interfaces/base.appError";
const devErrorSender = (err: IAPPError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodErrorSender = (err: IAPPError, res: Response) => {
  if (err.isOperational) {
    //Operation error (App Error)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Operation error (App Error)
    console.log(`Error 💣 `, err);
    res.status(500).json({
      status: "error",
      message: "Somthing went very wrong.",
    });
  }
};
export const globalErrorController = (
  error: IAPPError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development") {
    devErrorSender(error, res);
  } else if (process.env.NODE_ENV === "production") {
    prodErrorSender(error, res);
  }
};
