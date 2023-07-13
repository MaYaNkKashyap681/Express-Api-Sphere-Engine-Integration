interface IUser extends Document {
  _id?: string;
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
