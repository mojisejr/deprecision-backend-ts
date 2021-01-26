import { UserDTO } from "../../domain/users/dto/user.dto";
import { IUser } from "../../domain/users/model/user.interface";
import { Repository } from "./../../core/interfaces/base.repository";
export interface AuthRepository extends Repository<IUser, UserDTO> {
  getPasswordByEmail(email: string): IUser | Promise<IUser>;
  getByEmail(email: string): IUser | Promise<IUser>;
  isCorrectPassword(
    reqPassword: string,
    passwordFromDB: string
  ): boolean | Promise<boolean>;
  isPasswordChangedAfterIssued(
    passwordChangedAt: Date,
    jwtIssuedAt: string
  ): boolean | Promise<boolean>;
  createPasswordResetToken(id: string): string | Promise<string>;
}
