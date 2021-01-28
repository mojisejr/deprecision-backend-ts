import { Request, Response, NextFunction } from "express";
import { IBaseController } from "../../../core/interfaces/base.controller.interface";
// export interface IProductController {
//   create(req: Request, res: Response, next: NextFunction): void;
//   getAll(req: Request, res: Response, next: NextFunction): void;
//   getById(req: Request, res: Response, next: NextFunction): void;
//   update(req: Request, res: Response, next: NextFunction): void;
//   delete(req: Request, res: Response, next: NextFunction): void;
// }
export interface IProductController extends IBaseController {}
