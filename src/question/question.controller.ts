import { Router, Request, Response, NextFunction } from "express";
import Controller from "../globalinterfaces/controller.interface";
import QuestionService from "./question.service";
import {IQuestion} from "./question.interface";
import AuthMiddleware from "../middlewares/auth.middleware";
import CheckAdminMiddleware from "../middlewares/check.role.middleware";

class QuestionController implements Controller {
  public path: string = "/question";
  public router: Router = Router();
  public questionservice: QuestionService;

  constructor() {
    this.questionservice = new QuestionService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.getAllQuestion);
    this.router.get(`${this.path}/:questionId`, this.getOneQuestion);
    this.router.post(
      `${this.path}/add`,
      AuthMiddleware,
      CheckAdminMiddleware,
      this.createQuestion
    );

    this.router.post(`${this.path}/submit/:questionId`, this.submitQuestion);
    this.router.patch(
      `${this.path}/addtc/:questionId`,
      AuthMiddleware,
      CheckAdminMiddleware,
      this.addTestCase
    );
    this.router.delete(
      `${this.path}/del/:questionId`,
      AuthMiddleware,
      CheckAdminMiddleware,
      this.deleteQuestion
    );
    this.router.patch(
      `${this.path}/modify/:questionId`,
      AuthMiddleware,
      CheckAdminMiddleware,
      this.modifyQuestion
    );
  }

  public getAllQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this.questionservice.findAll();
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  public getOneQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { questionId } = req.params;
      const response = await this.questionservice.findOne(questionId);
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  public createQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, description, testCases } = req.body;
      const data: IQuestion = {
        title: title,
        description: description,
        testCases: testCases,
      };
      const response = await this.questionservice.addQuestion(data);
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  public addTestCase = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { questionId } = req.params;
      const response = await this.questionservice.addTestCase(questionId, null);
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { questionId } = req.params;
      const response = await this.questionservice.deleteQuestion(questionId);
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  public modifyQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { questionId } = req.params;
      const response = await this.questionservice.modifyQuestion(
        questionId,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  public submitQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { questionId } = req.params;
      const response = await this.questionservice.submitQuestion(
        questionId,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };
}

export default QuestionController;
