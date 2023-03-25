"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
//@ts-nocheck
const errors_1 = require("../errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof errors_1.CustomAPIError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    let customError = {
        // set default
        statusCode: err.statusCode || http_status_codes_1.default.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    };
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }
    return res.status(customError.statusCode).json({ error: customError.msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
