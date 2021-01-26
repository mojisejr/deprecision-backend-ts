import { DTO } from "../../../core/interfaces/base.dto";

export interface UserDTO extends DTO {
  name: string;
  email: string;
  password: string;
  displayName?: string;
  role: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: String;
  passwordResetExpires?: Date;
}
