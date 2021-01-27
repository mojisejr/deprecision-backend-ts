export interface IUser {
  _id?: any;
  name: string;
  email: string;
  password: string | undefined;
  displayName: string;
  role: string;
  passwordConfirm: string | undefined;
  passwordChangedAt: Date;
  passwordResetToken: String | undefined;
  passwordResetExpires: Date | undefined;

  save(option?: any): Promise<IUser>;
}
