import { injectable } from "inversify";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Repository } from "./../../../core/interfaces/base.repository";
import { IUser } from "./../model/user.interface";
import { userModel } from "../model/user.model";
import { UserDTO } from "../dto/user.dto";
import { MongooseAPIFeature } from "./../../../utils/mongoose.api.feature";

@injectable()
export class UserRepository implements Repository<IUser, UserDTO> {
  async create(dto: UserDTO): Promise<IUser> {
    return await userModel.create(dto);
  }

  async getById(id: string): Promise<IUser> {
    return await userModel.findById(id);
  }

  async getByEmail(email: string): Promise<IUser> {
    return await userModel.findOne({ email: email });
  }

  async getPasswordByEmail(email: string): Promise<IUser> {
    return await userModel.findOne({ email }).select("+password");
  }

  async isCorrectPassword(
    inputPassword: string,
    dbPassword: string
  ): Promise<boolean> {
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

    console.log({ resetToken }, passwordResetToken);
    //3. return un encrypted password
    return resetToken;
  };

  async getAll(queryString?: string): Promise<IUser[]> {
    const users = new MongooseAPIFeature(userModel, queryString)
      .filter()
      .limitFields();
    return await users.query;
  }
  async update(id: string, user: Partial<IUser>): Promise<IUser> {
    return await userModel.findByIdAndUpdate(id, user);
  }
  async delete(id: string): Promise<void> {
    throw new Error("no implementation");
  }
}
