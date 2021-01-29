import { Request, Response, NextFunction } from "express";
import { IBaseController } from "../../core/interfaces/base.controller.interface";
export interface IAuthController {
  signUp(req: Request, res: Response, next: NextFunction): void;
  signIn(req: Request, res: Response, next: NextFunction): void;
  protect(req: Request, res: Response, next: NextFunction): void;
  restrictTo(role: string): void;
  forgotPassword(req: Request, res: Response, next: NextFunction): void;
  resetPassword(req: Request, res: Response, next: NextFunction): void;
  updatePassword(req: Request, res: Response, next: NextFunction): void;
  // signOut(req: Request, res: Response, next: NextFunction): void;
}
