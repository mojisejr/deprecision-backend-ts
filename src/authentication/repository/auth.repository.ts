import { UserRepository } from "../../domain/users/repository/user.repository";
import { IAuthRepository } from "./auth.repository.interface";
import { userModel } from "./../../domain/users/model/user.model";
import { IUser } from "./../../domain/users/model/user.interface";
import crypto from "crypto";
import bcrypt from "bcrypt";

export class AuthRepository extends UserRepository implements IAuthRepository {
  async getByEmail(email: string): Promise<IUser> {
    return await userModel.findOne({ email: email });
  }

  async getPasswordByEmail(email: string): Promise<IUser> {
    return await userModel.findOne({ email }).select("+password");
  }

  async findUser(option: any) {
    return await userModel.findOne(option);
  }
  async isCorrectPassword(
    inputPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    if (!inputPassword || !dbPassword || dbPassword === "") {
      throw new Error(
        "isCorrectPassword, input password or db password is undefined"
      );
    }
    return await bcrypt.compare(inputPassword, dbPassword);
  }

  isPasswordChangedAfterIssued(
    passwordChangedAt: Date,
    jwtTime: string
  ): boolean {
    if (passwordChangedAt) {
      const pwdChangedTimeStamp = passwordChangedAt.getTime() / 1000;
      //if pwd changed after jwt issued the jwt timestamp will less than pwd timestamp
      return +jwtTime < pwdChangedTimeStamp;
    }
    return false;
  }

  createPasswordResetToken = async (id: string) => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    //2. encode the resetToken and add to the user
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await this.update(id, {
      passwordResetToken: passwordResetToken,
      passwordResetExpires: passwordResetExpires,
    });

    // console.log({ resetToken }, passwordResetToken);
    //3. return un encrypted password
    return resetToken;
  };
}
