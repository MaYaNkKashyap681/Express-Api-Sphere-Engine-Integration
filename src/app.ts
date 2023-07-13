
import express = require('express');
import { Request, Response } from "express";
import cookieParser = require("cookie-parser")
import Controller from "./globalinterfaces/controller.interface";
import * as mongoose from "mongoose";
import { config } from "./config/serverConfig";
const bodyParser = require("body-parser");
import { errorMiddleware } from "./middlewares/error.middleware";

class App {
  //express App
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeErrorHandling() {
    this.app.use("/", errorMiddleware);
  }

  public listen() {
    this.app.listen(config.port, () => {
      console.log("Server is Strted on PORT 3000");
    });
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  public getServer() {
    return this.app;
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    //API for Testing Purpose
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        msg: "Api is Working successfully",
      });
    });
  }
  private connectToDatabase() {
    mongoose.connect(config.dbUrl).then(() => {
      console.log("Database Connected");
    });
  }
}

export default App;
