import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import { catchAsyncError } from "../../core/catchAsyncError";
import TYPES from "../../core/container/types";
// import { UserRepository } from "../domain/users/repository/user.repository";
import { UserDTO } from "../../domain/users/dto/user.dto";
import { APPError } from "../../error/app.error";
import { IAuthController } from "./auth.controller.interface";
import { jwtDecodedDTO } from "../dto/jwt.dto";
import { AuthRepository } from "../repository/auth.repository.interface";

@injectable()
export class AuthController implements IAuthController {
  private userRepository: AuthRepository;
  constructor(@inject(TYPES.AuthRepository) userRepository: AuthRepository) {
    this.userRepository = userRepository;
  }

  private signToken(id: string) {
    //TODO: เดี๋ยวต้องใช้ dotenv มากำหนด
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  signUp = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const userDataFromReq: UserDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
      };
      const createdUser = await this.userRepository.create(userDataFromReq);
      if (!createdUser._id)
        return next(
          APPError.create("somthing wrong with your data fetching", 500)
        );
      const jwtToken = this.signToken(createdUser._id);

      res.status(200).json({
        status: "success",
        token: jwtToken,
        data: {
          user: createdUser,
        },
      });
    }
  );

  signIn = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          APPError.create(`please provide valid email and password`, 400)
        );
      }
      const signedInUser = await this.userRepository.getPasswordByEmail(email);
      if (
        !signedInUser ||
        !this.userRepository.isCorrectPassword(password, signedInUser.password)
      ) {
        return next(APPError.create(`Incorrect email or password`, 401));
      }

      const jwtToken = this.signToken(signedInUser._id);
      res.status(200).json({
        status: "success",
        token: jwtToken,
        message: "authenticated",
      });
    }
  );

  protect = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      let inputJwtToken;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        inputJwtToken = req.headers.authorization.split(" ")[1];
      }

      if (!inputJwtToken) {
        return next(APPError.create("You are not logged in", 401));
      }

      const decodedData = await this.jwtTokenVerification(
        inputJwtToken,
        process.env.JWT_SECRET
      );

      const user = await this.userRepository.getById(decodedData.id);
      if (!user) {
        return next(APPError.create("the user is no longer exist.", 401));
      }

      const passwordChanged = this.userRepository.isPasswordChangedAfterIssued(
        user.passwordChangedAt,
        decodedData.iat
      );

      if (passwordChanged) {
        return next(
          APPError.create("password was changed please re-login again.", 401)
        );
      }
      req.user = user;
      next();
    }
  );

  restrictTo = (roles: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      //roles is an array
      if (!roles.includes(req.user.role)) {
        return next(
          APPError.create(
            `permission denined, your cannot perform this action. `,
            403
          )
        );
      }
      next();
    };
  };

  forgotPassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userRepository.getByEmail(req.body.email);
      if (!user) {
        return next(
          APPError.create("There is no user with email address", 404)
        );
      }

      const resetToken = this.userRepository.createPasswordResetToken(user._id);
    }
  );

  protected jwtTokenVerification(inputToken: string, secret: string) {
    return new Promise<jwtDecodedDTO>((resolve, rejects) => {
      if (!inputToken || !secret) {
        rejects(new Error("input token or secret is undefined"));
      }
      const decoded = jwt.verify(inputToken, secret) as jwtDecodedDTO;
      resolve(decoded);
    });
  }
}
