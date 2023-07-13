import * as express from "express";
import * as cookieParser from "cookie-parser";
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
  }
  private connectToDatabase() {
    mongoose.connect(config.dbUrl).then(() => {
      console.log("Database Connected");
    });
  }
}

export default App;
