import Controller from "../globalinterfaces/controller.interface";
import * as express from "express";
import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";
import AuthMiddleware from "../middlewares/auth.middleware";
import RequestWithUser from "../globalinterfaces/user.request.interface";
import CheckAdminMiddleware from "../middlewares/check.role.middleware";

class UserController implements Controller {
  public path: String = "/user";
  public router: Router = express.Router();
  public userservice: any;

  constructor() {
    this.userservice = new UserService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //GET Routes
    this.router.get(`${this.path}/all`, AuthMiddleware, CheckAdminMiddleware, this.getAllUsers);
    this.router.get(`${this.path}/getuser`, AuthMiddleware, this.getUser);

    //PATCH Routes
    this.router.patch(`${this.path}/update`, AuthMiddleware, this.updateUser);

    //DELETE Routes
    this.router.delete(`${this.path}/del`, AuthMiddleware, this.deleteUser);
  }

  private getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this.userservice.getAllUsers();
      return res.status(200).json({
        success: true,
        message: "Successfully got all Usesr",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  private getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      
      const response = await this.userservice.getOneUser(req.user._id);
      return res.status(200).json({
        success: true,
        message: "Successfully got a user",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  private deleteUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this.userservice.deleteUser(req.user._id);
      return res.status(200).json({
        success: true,
        message: "Successfully deleted the user",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  private updateUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {_id} = req.user;
      const response = await this.userservice.updateUser(_id, req.body);
      return res.status(200).json({
        success: true,
        message: "Successfully updated the user",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
