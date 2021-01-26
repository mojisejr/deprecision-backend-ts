import { IUser } from "./user.interface";
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
export interface User extends Document, IUser {}
export interface UserModel extends Model<User> {
  isPasswordChangedAfterJWTIssued(jwtTime: string): boolean;
}
export const userSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide valid email"],
  },
  displayImage: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlegnth: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      //only work with save and ceate
      validator: function (this: User, password: string) {
        return password === this.password;
      },
      message: "password are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (this: User, next) {
  //only run when password is modified
  if (!this.isModified("password")) {
    return next();
  }
  //12 is the password cost
  this.password = await bcrypt.hash(this.password, 12);
  //no need to be persisted but required to input to the req body
  this.passwordConfirm = undefined;
});

export const userModel = mongoose.model<User, UserModel>("User", userSchema);
