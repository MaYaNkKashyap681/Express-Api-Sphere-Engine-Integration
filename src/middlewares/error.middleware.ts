import HTTPException from "../exceptions/http.exception";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message: string = err.message || "Something went wrong";
  const status: number = err.status || 500;
  res.status(status).json({
    message,
    status,
  });
};
