import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import IQuestion from "./question.interface";

const questionSchema: Schema<IQuestion> = new Schema<IQuestion>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  testCases: [{ type: String }],
});

// Create the Question model
const questionModel = mongoose.model<IQuestion>(
  "Question",
  questionSchema
);

export default questionModel;
