import WrongAuthTokenPassedException from "../exceptions/auth.access-token.exception";
import AuthTokenMissing from "../exceptions/auth.token.exception";
import HttpException from "../exceptions/http.exception";
import { NextFunction, Response } from "express";
import RequestWithUser from "../globalinterfaces/user.request.interface";
import * as jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { config } from "../config/serverConfig";

async function AuthMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.header("Authorization");

    if (!authHeader) {
      throw new AuthTokenMissing();
    }

    const [bearer, token] = authHeader.split(" ");

    try {
      const verifyResponse = jwt.verify(token, config.secret) as any;
      const id = verifyResponse.id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        throw new WrongAuthTokenPassedException();
      }
    } catch (err) {
      throw new WrongAuthTokenPassedException();
    }
  } catch (error) {
    next(new HttpException(401, error.message)); // Adjust the status code as per your requirements
  }
}

export default AuthMiddleware;
