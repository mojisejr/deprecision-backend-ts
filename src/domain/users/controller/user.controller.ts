import { Request, Response, NextFunction } from "express";
import { inject, injectable, named } from "inversify";
import TAGS from "../../../core/container/tags";
import TYPES from "../../../core/container/types";
import { APPError } from "../../../error/app.error";
import { catchAsyncError } from "./../../../core/catchAsyncError";
import { IUser } from "./../model/user.interface";
import { UserDTO, UserUpdateInfoDTO } from "../dto/user.dto";
import { IUserController } from "./user.controller.interface";
import { Repository } from "./../../../core/interfaces/base.repository";
import { BaseController } from "../../../core/interfaces/base.controller.class";

@injectable()
export class UserController
  extends BaseController<IUser, UserDTO>
  implements IUserController {
  private userRepository: Repository<IUser, UserDTO>;
  constructor(
    @inject(TYPES.Repository)
    @named(TAGS.UserRepository)
    repository: Repository<IUser, UserDTO>
  ) {
    super(repository);
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

  updateMe = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      //1 create an error if user try to update their password
      const updateData: UserUpdateInfoDTO = {
        name: req.body.name,
      };
      //2 update user document
      const updatedUser = await this.userRepository.update(
        req.user._id,
        updateData
      );
      if (!updatedUser) {
        next(APPError.create("cannot update the user data", 400));
      }
      res.status(204).json({
        status: "success",
        message: "data has been updated",
      });
    }
  );

  deleteMe = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req.user);
      await this.userRepository.delete(req.user._id);

      res.status(204).json({
        status: "success",
        data: "null",
      });
    }
  );
}
