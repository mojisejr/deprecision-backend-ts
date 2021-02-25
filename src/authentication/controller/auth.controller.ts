import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import crypto from "crypto";
import { catchAsyncError } from "../../core/catchAsyncError";
import TYPES from "../../core/container/types";
// import { UserRepository } from "../domain/users/repository/user.repository";
import { UserDTO } from "../../domain/users/dto/user.dto";
import { APPError } from "../../error/app.error";
import { IAuthController } from "./auth.controller.interface";
import { jwtDecodedDTO } from "../dto/jwt.dto";
import { IAuthRepository } from "../repository/auth.repository.interface";
import { IEmailSender } from "./../../core/interfaces/base.emailsender";
import { IUser } from "../../domain/users/model/user.interface";

@injectable()
export class AuthController implements IAuthController {
  private userRepository: IAuthRepository;
  private emailSender: IEmailSender;
  constructor(
    @inject(TYPES.AuthRepository) userRepository: IAuthRepository,
    @inject(TYPES.EmailSender) emailSender: IEmailSender
  ) {
    this.userRepository = userRepository;
    this.emailSender = emailSender;
  }

  private signToken(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  protected jwtTokenVerification(inputToken: string, secret: string) {
    return new Promise<jwtDecodedDTO>((resolve, rejects) => {
      if (!inputToken || !secret) {
        rejects(new Error("input token or secret is undefined"));
      }
      const decoded = jwt.verify(inputToken, secret) as jwtDecodedDTO;
      resolve(decoded);
    });
  }

  private createAndSendToken(user: IUser, statusCode: number, res: Response) {
    const token = this.signToken(user._id);
    //set the jwt to the cookie
    //do not expose password to user via response
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      //หมายถึงต้องใช้กับ https เท่านั้น
      // secure: process.env.NODE_ENV === "production" ? true : false,
      secure: true,
      //ป้องกัน cross site scipting คือจะแก้ cookie กันนี้ไม่ได้เป็น readonly
      httpOnly: true,
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      sameSite: "none",
    });
    user.password = undefined;
    res.status(statusCode).json({
      status: "success",
      token: token,
      data: {
        user,
      },
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
      this.createAndSendToken(createdUser, 201, res);
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
        !(await this.userRepository.isCorrectPassword(
          password,
          signedInUser.password!
        ))
      ) {
        return next(APPError.create(`Incorrect email or password`, 401));
      }

      this.createAndSendToken(signedInUser, 200, res);
    }
  );

  signOut = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      res.cookie("jwt", "logged out", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        sameSite: "strict",
      });

      res.status(200).json({
        status: "success",
      });
      return next();
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
      } else if (req.cookies.jwt) {
        inputJwtToken = req.cookies.jwt;
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
      res.locals.user = user;
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

  // not yet needed
  forgotPassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userRepository.findUser({
        email: req.body.email,
      });
      if (!user) {
        return next(
          APPError.create("There is no user with email address", 404)
        );
      }

      const resetToken = await this.userRepository.createPasswordResetToken(
        user._id
      );
      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/resetPassword/${resetToken}`;

      const message = `Forget your password? submit a PATCH request with your new password
      and passwordConfirm to: ${resetURL}. \n
      If you didn't forget your password please ignore this email!`;

      try {
        await this.emailSender.sendEmail({
          email: user.email,
          subject: `your password reset token available only 10 min`,
          message,
        });
      } catch (error) {
        user.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        this.userRepository.save(user, false);
        return next(
          APPError.create("there was an error sending an email, try again", 500)
        );
      }
      res.status(200).json({
        status: "success",
        message: "token sent to email!",
      });
    }
  );

  resetPassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const passwordResetToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
      // console.log("reset token from requset:", passwordResetToken);
      const user = await this.userRepository.findUser({
        passwordResetToken: passwordResetToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return next(APPError.create("token are invalid or expired", 400));
      }
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      this.userRepository.save(user, false);

      this.createAndSendToken(user, 200, res);
    }
  );

  updatePassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      //1 get user from the collection
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const passwordConfirm = req.body.passwordConfirm;

      const currentUser = await this.userRepository.getPasswordByEmail(
        req.user.email
      );
      if (!currentUser) {
        return next(APPError.create("you are not logged in, try again", 401));
      }
      //2 check if the password is correct
      const isPasswordCorrect = await this.userRepository.isCorrectPassword(
        oldPassword,
        currentUser.password!
      );
      if (!isPasswordCorrect) {
        return next(APPError.create("incorrect password for this user", 401));
      }
      //3 then update the password
      currentUser.password = newPassword;
      currentUser.passwordConfirm = passwordConfirm;
      await this.userRepository.save(currentUser);
      //4 log the user in (send back the token)
      this.createAndSendToken(currentUser, 201, res);
    }
  );
}
