import { Model } from "mongoose";
import Service from "../globalinterfaces/service.interface";
import { IQuestion, ITC } from "./question.interface";
import questionModel from "./question.model";
import { AxiosInstance } from 'axios';
import * as axios from 'axios';
import HTTPException from "../exceptions/http.exception";
import * as dotenv from "dotenv";
dotenv.config();

const instance: AxiosInstance = axios.create();

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
  public submitQuestion = async (questionId: string, submissionData: any) => {
    try {
      const getQuestion = await questionModel.findById(questionId);
      if (!getQuestion) {
        throw new HTTPException(400, "Question not Found");
      }
  
      const testCases: ITC[] = getQuestion.testCases;
      const submissionPromises = testCases.map((tc: ITC) => {
        const payload = {
          compilerId: submissionData.languageId,
          source: submissionData.code,
          input: tc.input,
          expectedOutput: tc.output,
        };
  
        return instance
          .post(
            `https://api.compilers.sphere-engine.com/api/v4/submissions?access_token=${process.env.api_token}`,
            payload
          )
          .then((response) => {
            if (response && response.data) {
              return response.data.id;
            } else {
              throw new HTTPException(400, "Error");
            }
          })
          .catch((error) => {
            throw new HTTPException(400, "Error");
          });
      });
  
      const submissionResults = await Promise.all(submissionPromises);
  
      if (submissionResults.every((result) => result != null)) {
        const submissionExistPromises = submissionResults.map((submissionId) => {
          return new Promise(async (resolve, reject) => {
            try {
              const response = await instance.get(
                `https://api.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=${process.env.api_token}`
              );
  
              if (response && response.data) {
                resolve(response.data);
              } else {
                throw new HTTPException(400, "Error");
              }
            } catch (error) {
              reject(new HTTPException(400, "Error"));
            }
          });
        });
  
        const submissionExistResults = await Promise.all(submissionExistPromises);
  
        if (submissionExistResults.every((result) => result != null)) {
          const resultPromises = submissionResults.map((submissionId) => {
            return new Promise(async (resolve, reject) => {
              try {
                const response = await instance.get(
                  `https://api.compilers.sphere-engine.com/api/v4/submissions/${submissionId}/output?access_token=${process.env.api_token}`
                );
  
                if (response && response.data) {
                  resolve(response.data);
                } else {
                  throw new HTTPException(400, "Error");
                }
              } catch (error) {
                reject(new HTTPException(400, "Error"));
              }
            });
          });
  
          const results = await Promise.all(resultPromises);
  
          if (results.every((result) => result != null)) {
            const outputMatcher = results.map((op, index) => {
              console.log(op, testCases[index].output);
              return op == testCases[index].output;
            });
  
            const totalCorrect = outputMatcher.reduce(
              (acc, curr) => acc + (curr ? 1 : 0),
              0
            );
  
            let status = "error";
            switch (true) {
              case totalCorrect == outputMatcher.length:
                status = "success";
                break;
              case totalCorrect < outputMatcher.length:
                status = "wrong";
                break;
              default:
                status = "error";
            }
  
            return {
              outputArray: outputMatcher,
              correct: totalCorrect + " out of " + outputMatcher.length,
              status: status,
            };
          }
        }
      }
    } catch (error) {
      return {
        status: "error",
        error: error.message,
      };
    }
  };
}

export default QuestionService;
