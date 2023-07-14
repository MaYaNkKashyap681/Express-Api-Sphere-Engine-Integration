import HTTPException from "./http.exception";

class userAlreadyExist extends HTTPException {
  constructor(_message?: string) {
    super(409, _message ? _message : "User Already Exist");
  }
}

export default userAlreadyExist;
