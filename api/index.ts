import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv").config();
const connectDB = require('./db/connect');
// const cookieParser = require('cookie-parser');
//ROUTES
const registerRouter = require("./routes/auth");
const cors = require('cors');
const app: Express = express();
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use(express.json());
// app.use(cookieParser());
const port = 4000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", registerRouter);

const start = async () => {
  const dbAddress = process.env.MONGO_URI;
  if (dbAddress) {
    try {
      await connectDB(dbAddress);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    console.warn("Theres's no db address!");
  }
};

start();
