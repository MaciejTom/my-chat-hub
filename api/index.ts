import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv").config();
const connectDB = require('./db/connect');
//ROUTES
const registerRouter = require("./routes/auth");

const app: Express = express();
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", registerRouter);

const start = async () => {
  const dbAddress = process.env.MONGO_URI;
  console.log(dbAddress);
  debugger
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
