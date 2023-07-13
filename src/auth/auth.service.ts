import { Model } from "mongoose";
import userModel from "../models/user.model";
import Service from "../globalinterfaces/service.interface";
import HTTPException from "../exceptions/http.exception";
import UserNotExist from "../exceptions/user.notExist.exception";
import * as bcrypt from "bcryptjs";
import WrongCredentials from "../exceptions/wrong.credentials";
import * as jwt from "jsonwebtoken";
import { config } from "../config/serverConfig";
import userAlreadyExist from "../exceptions/user.exist.exception";
import IUser from "../models/user.model.interface";

class AuthService implements Service {
  public dbModel: Model<IUser>;
  constructor() {
    this.dbModel = userModel;
  }

  public async hello() {
    console.log("sbdsbfkbdf");
    return "hello";
  }

  public registerUser = async (data: any) => {
    try {
      const userExist = await this.findByEmail(data.email);
      if (userExist) {
        throw new userAlreadyExist();
      }
      //Hashing the Password
      const salt = bcrypt.genSaltSync(10);

      const hashed_password = bcrypt.hashSync(data.password, salt);

      data.password = hashed_password;

      const createrUser = await this.dbModel.create(data);
      if (!createrUser) throw new HTTPException(400, "User not created");

      const token = jwt.sign(
        { id: createrUser._id, role: createrUser.role },
        config.secret,
        { expiresIn: "1d" }
      );

      return { token, email: createrUser.email };
    } catch (error) {
      throw error;
    }
  };

  public loginUser = async (data: any) => {
    try {
      console.log(data.email);
      const userExist = await this.dbModel.findOne({ email: data.email });

      if (!userExist) {
        throw new UserNotExist();
      }

      const passwordMatch = await bcrypt.compare(
        data.password,
        userExist.password
      );

      if (!passwordMatch) {
        throw new WrongCredentials();
      }

      const token = jwt.sign(
        { id: userExist._id, role: userExist.role },
        config.secret,
        { expiresIn: "1d" }
      );
      return { token, email: userExist.email };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public logoutUser = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };

  private findByEmail = async (email: string) => {
    try {
      const response = await this.dbModel.findOne({ email: email });
      return response;
    } catch (err) {
      throw err;
    }
  };
}

export default AuthService;
