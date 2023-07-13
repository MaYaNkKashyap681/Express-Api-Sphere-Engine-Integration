import { Model } from "mongoose";
import Service from "../globalinterfaces/service.interface";
import IQuestion from "./question.interface";
import questionModel from "./question.model";

class QuestionService implements Service {
  public dbModel: Model<IQuestion>;

  constructor() {
    this.dbModel = questionModel;
  }

  public async findAll() {
    try {
      const questions = await this.dbModel.find();
      return questions;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(questionId: string) {
    try {
      const question = await this.dbModel.findById(questionId);
      return question;
    } catch (error) {
      throw error;
    }
  }

  public async modifyQuestion(
    questionId: string,
    updatedQuestion: Partial<IQuestion>
  ) {
    try {
      const question = await this.dbModel.findByIdAndUpdate(
        questionId,
        updatedQuestion,
        { new: true }
      );
      return question;
    } catch (error) {
      throw error;
    }
  }

  public async deleteQuestion(questionId: string) {
    try {
      await this.dbModel.findByIdAndDelete(questionId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async addQuestion(newQuestion: IQuestion) {
    try {
      const question = await this.dbModel.create(newQuestion);
      return question;
    } catch (error) {
      throw error;
    }
  }

  public async addTestCase(questionId: string, testCase: any) {
    try {
      const question = await this.dbModel.findById(questionId);
      question.testCases.push(testCase);
      await question.save();
      return question;
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionService;
