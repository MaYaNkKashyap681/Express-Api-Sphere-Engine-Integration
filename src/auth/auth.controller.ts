import Controller from "../globalinterfaces/controller.interface";
import * as express from "express";
import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";

class AuthController implements Controller {
  public path: String = "/auth";
  public router: Router = express.Router();
  public authservice: any;

  constructor() {
    this.authservice = new AuthService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //GET Routes
    // this.router.get(`${this.path}/logout`, this.logoutUser);

    //POST Routes
    this.router.post(`${this.path}/register`, this.registerUser);
    this.router.post(`${this.path}/login`, this.loginUser);
  }

  private registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //destructuring the data
      const { name, email, password } = req.body;
      const data = {
        email: email,
        name: name,
        password: password,
      };
      const response = await this.authservice.registerUser(data);

      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: {
          email: response.email,
          token: response.token,
        },
        err: {},
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const data = {
        email: email,
        password: password,
      };

      const response = await this.authservice.loginUser(data);
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: {
          email: response.email,
          token: response.token,
        },
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
