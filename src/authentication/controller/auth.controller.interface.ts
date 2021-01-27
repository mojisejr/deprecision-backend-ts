import { Request, Response, NextFunction } from "express";
export interface IAuthController {
  signUp(req: Request, res: Response, next: NextFunction): void;
  signIn(req: Request, res: Response, next: NextFunction): void;
  protect(req: Request, res: Response, next: NextFunction): void;
  restrictTo(role: string): void;
  forgotPassword(req: Request, res: Response, next: NextFunction): void;
  resetPassword(req: Request, res: Response, next: NextFunction): void;
  // signOut(req: Request, res: Response, next: NextFunction): void;
}
