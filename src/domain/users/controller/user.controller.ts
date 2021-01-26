import { Repository } from "./../../../core/interfaces/base.repository";
import { IUser } from "./../model/user.interface";
import { catchAsyncError } from "./../../../core/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import { UserDTO } from "../dto/user.dto";
import { APPError } from "../../../error/app.error";
import { inject, injectable, named } from "inversify";
import TYPES from "../../../core/container/types";
import TAGS from "../../../core/container/tags";
import { IUserController } from "./user.controller.interface";

@injectable()
export class UserController implements IUserController {
  private userRepository: Repository<IUser, UserDTO>;
  constructor(
    @inject(TYPES.Repository)
    @named(TAGS.UserRepository)
    repository: Repository<IUser, UserDTO>
  ) {
    this.userRepository = repository;
  }

  create = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      next(APPError.create("no implementation", 500));
    }
  );
  getAll = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userRepository.getAll();
      res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    }
  );
  getById = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const user = await this.userRepository.getById(id);
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    }
  );
  update = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const updatedProduct = await this.userRepository.update(id, req.body);
      if (!updatedProduct) {
        return next(
          APPError.create(`no user found for update with id ${id}`, 404)
        );
      }
      res.status(204).json({
        status: "success",
        message: `product with ${id} updated successfully`,
      });
    }
  );
  delete = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      next(APPError.create("no implementation", 500));
    }
  );
}
