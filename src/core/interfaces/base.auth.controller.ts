import { Request, Response, NextFunction } from "express";
export interface IAuthController {
  signUp(req: Request, res: Response, next: NextFunction): void;
  signIn(req: Request, res: Response, next: NextFunction): void;
  signOut(req: Request, res: Response, next: NextFunction): void;
}
