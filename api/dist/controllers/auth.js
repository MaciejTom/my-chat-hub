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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errors_1 = require("../errors");
const cookieParser = require('cookie-parser');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const createdUser = yield User_1.User.create(user);
    const token = createdUser.createJWT();
    res.cookie('token', token, { sameSite: 'none', secure: true }).status(http_status_codes_1.default.CREATED).json({ id: createdUser._id });
});
exports.register = register;
//CHECK IT IS PROPER OBJECT ABOVE (SAME SITE)
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sth = req.body;
    const { username, password } = req.body;
    if (!username || !password) {
        throw new errors_1.BadRequestError("Please provide username and password");
    }
    const user = yield User_1.User.findOne({ username });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    // compare password
    const token = user.createJWT();
    res.status(http_status_codes_1.default.OK).json({ user: { name: user.username }, token });
});
exports.login = login;
const authUser = (req, res) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (token) {
        jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), {}, (err, userData) => {
            if (err)
                throw err;
            res.json(userData);
        });
    }
    else {
        res.status(http_status_codes_1.default.UNAUTHORIZED).json('no token');
    }
};
exports.authUser = authUser;
