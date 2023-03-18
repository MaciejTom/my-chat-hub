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
//ROUTES
const registerRouter = require("./routes/auth");
const app = (0, express_1.default)();
const port = 4000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", registerRouter);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbAddress = process.env.MONGO_URI;
    console.log(dbAddress);
    debugger;
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
