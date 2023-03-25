import { model, Schema, Model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password: string;
}
interface IUserDb extends IUser {
  createJWT(): string;
  comparePassword(canditatePassword: string): string;
}

const UserSchema = new Schema<IUserDb>(
  {
    username: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 14,
      minlength: 3,
      uniq: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function () {
  const saltTime = Number(process.env.BCRYPTO_SALT) ?? 10;
  const salt = await bcrypt.genSalt(saltTime);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function (): string {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
UserSchema.methods.comparePassword = async function (
  canditatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
export const User: Model<IUserDb> = model<IUserDb>("User", UserSchema);
