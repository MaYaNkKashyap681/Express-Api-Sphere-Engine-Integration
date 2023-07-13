import HTTPException from "../exceptions/http.exception";
import { Request, Response, NextFunction } from "express";
import RequestWithUser from "../globalinterfaces/user.request.interface";

const CheckAdminMiddleware = (
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user.role === "admin") {
      next();
    } else {
      throw new HTTPException(401, "You are not allowed");
    }
  } catch (error) {
    next(error);
  }
};

export default CheckAdminMiddleware;
