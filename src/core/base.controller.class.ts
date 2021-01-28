import { Response, Request, NextFunction } from "express";
import { injectable } from "inversify";
import { APPError } from "../error/app.error";
import { catchAsyncError } from "./catchAsyncError";
import { IBaseController } from "./interfaces/base.controller.interface";
import { Repository } from "./interfaces/base.repository";

@injectable()
export class BaseController<T, K> implements IBaseController {
  private repository: Repository<T, K>;
  constructor(repository: Repository<T, K>) {
    this.repository = repository;
  }

  create = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const dataToCreate: K = req.body;
      const newData = await this.repository.create(dataToCreate);
      if (!newData) {
        return next(APPError.create("cannot create data object", 400));
      }
      return res.status(201).json({
        status: "success",
        data: {
          ...newData,
        },
      });
    }
  );

  getAll = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const dataCollection = await this.repository.getAll(req.query);
      res.status(200).json({
        status: "success",
        results: dataCollection.length,
        data: {
          ...dataCollection,
        },
      });
    }
  );

  getById = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const data = await this.repository.getById(id);
      if (!data) {
        return next(APPError.create("data not found", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          ...data,
        },
      });
    }
  );

  update = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const updatedData = await this.repository.update(id, req.body);
      if (!updatedData) {
        return next(APPError.create("cannot update data, try again", 400));
      }
      res.status(204).json({
        status: "success",
        message: `data with ${id} updated successfully`,
      });
    }
  );

  delete = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const deleted = await this.repository.delete(id);
      if (!deleted) {
        return next(
          APPError.create("something wrong with delete, try again", 400)
        );
      }

      res.status(204).json({
        status: "success",
        message: `data with id ${id} has been deleted`,
      });
    }
  );
}
