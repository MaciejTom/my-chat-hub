"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unauthenticated_1 = require("./unauthenticated");
const not_found_1 = require("./not-found");
const bad_request_1 = require("./bad-request");
module.exports = {
    CustomAPIError,
    UnauthenticatedError: unauthenticated_1.UnauthenticatedError,
    NotFoundError: not_found_1.NotFoundError,
    BadRequestError: bad_request_1.BadRequestError,
};
