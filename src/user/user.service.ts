import { Model } from "mongoose";
import userModel from "../models/user.model";
import Service from "../globalinterfaces/service.interface";
import HTTPException from "../exceptions/http.exception";
import UserNotExist from "../exceptions/user.notExist.exception";
import bcrypt = require('bcryptjs')

class UserService implements Service {
  public dbModel: Model<any>;
  constructor() {
    this.dbModel = userModel;
  }

  public getAllUsers = async () => {
    try {
      const allUsers = await this.dbModel.find({});
      return allUsers;
    } catch (error) {
      throw error;
    }
  };

  public getOneUser = async (userId: String) => {
    try {
      const user = await this.dbModel.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  };

  public deleteUser = async (userId: String) => {
    try {
      const deletedUser = await this.dbModel.findOneAndDelete(userId);
      return {};
    } catch (error) {
      throw error;
    }
  };

  public updateUser = async (userId: string, updateFields: any) => {
    try {
      let hashed_password = null;
      if(updateFields.password) {
        const salt = bcrypt.genSaltSync(10);
        hashed_password = bcrypt.hashSync(updateFields.password, salt);
      }
      if(hashed_password != null) updateFields.password = hashed_password; 
      const updatedUser = await this.dbModel.findOneAndUpdate(
        { _id: userId },
        { $set: updateFields },
        { new: true }
      );
      if (!updatedUser) {
        throw new UserNotExist();
      }
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
