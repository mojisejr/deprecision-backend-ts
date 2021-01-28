import { Request, Response, NextFunction } from "express";
export interface IBaseController {
  create(req: Request, res: Response, next: NextFunction): void;
  getAll(req: Request, res: Response, next: NextFunction): void;
  getById(req: Request, res: Response, next: NextFunction): void;
  update(req: Request, res: Response, next: NextFunction): void;
  delete(req: Request, res: Response, next: NextFunction): void;
}
