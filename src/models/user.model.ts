import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import IUser from "./user.model.interface";

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<IUser & mongoose.Document>("User", userSchema);
export default userModel;
