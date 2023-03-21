"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.create(Object.assign({}, req.body));
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { username: user.username }, token });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Please provide username and password");
    }
    const user = yield User_1.User.findOne({ username });
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    // compare password
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
});
module.exports = { register, login };
