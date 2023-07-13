import HTTPException from "./http.exception";

class UserNotExist extends HTTPException {
    constructor() {
         super(400, "User Does not Exist")
    }
}

export default UserNotExist;