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
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv").config();
const connectDB = require('./db/connect');
const cookieParser = require('cookie-parser');
require("express-async-errors");
//ROUTES
const auth_1 = require("./routes/auth");
const notFoundMiddleware = require('./middleware/not-found');
const error_handler_1 = require("./middleware/error-handler");
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(express_1.default.json());
// app.use(notFoundMiddleware);
app.use(cookieParser());
const port = 4000;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", auth_1.router);
app.use(error_handler_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbAddress = process.env.MONGO_URI;
    if (dbAddress) {
        try {
            yield connectDB(dbAddress);
            app.listen(port, () => console.log(`Server is listening on port ${port}...`));
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        console.warn("Theres's no db address!");
    }
});
start();
