import { Request, Response, NextFunction } from "express";

export interface IUserController {
  getAll(req: Request, res: Response, next: NextFunction): void;
  getById(req: Request, res: Response, next: NextFunction): void;
  update(req: Request, res: Response, next: NextFunction): void;
}
