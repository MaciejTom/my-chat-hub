"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true },
    password: String,
}, { timestamps: true });
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
const UserModel = mongoose_1.default.model("User", UserSchema);
module.exports = UserModel;
