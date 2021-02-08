import { IUser } from "./user.interface";
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { APPError } from "../../../error/app.error";
export interface User extends Document<IUser> {
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
}
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
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
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

userSchema.pre("save", function (this: User, next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// userSchema.pre(
//   "find" || "findOneAndUpdate" || "findOneAndDelete",
//   function (this: UserModel, next) {
//     this.find({ active: { $ne: false } });
//     next(null);
//   }
// );
userSchema.pre<UserModel>(/^find/, function (next) {
  try {
    this.find({ active: { $ne: false } });
    next(null);
  } catch (error) {
    next(APPError.create("query system failed, contact system engineer", 400));
  }
});

export const userModel = mongoose.model<User, UserModel>("User", userSchema);
