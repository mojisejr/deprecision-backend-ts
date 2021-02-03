import { Request, Response, NextFunction } from "express";
import { IBaseController } from "../../../core/interfaces/base.controller.interface";

export interface IUserController extends IBaseController {
  updateMe(req: Request, res: Response, next: NextFunction): void;
  deleteMe(req: Request, res: Response, next: NextFunction): void;
}
