import { Request, Response, NextFunction } from "express";
export const catchAsyncError = (asyncFunctionInput: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFunctionInput(req, res, next).catch((error: Error) => {
      console.log("error", error);
      return next(error);
    });
  };
};
