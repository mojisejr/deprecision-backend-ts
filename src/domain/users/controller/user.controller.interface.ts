import { Request, Response, NextFunction } from "express";
import { IBaseController } from "../../../core/interfaces/base.controller.interface";

export interface IUserController extends IBaseController {
  getAll(req: Request, res: Response, next: NextFunction): void;
  getById(req: Request, res: Response, next: NextFunction): void;
  update(req: Request, res: Response, next: NextFunction): void;
}
