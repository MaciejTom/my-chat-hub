import mongoose from "mongoose";
import { IUser } from "../../models/IUser";
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
  }

const UserModel = mongoose.model<IUser>("User", UserSchema);
module.exports = UserModel;