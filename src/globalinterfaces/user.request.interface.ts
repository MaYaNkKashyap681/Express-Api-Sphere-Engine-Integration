import { Request } from "express"
import IUser from "models/user.model.interface";

interface RequestWithUser extends Request {
    user?: IUser;
}

export default RequestWithUser