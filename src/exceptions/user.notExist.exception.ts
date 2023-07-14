import HTTPException from "./http.exception";

class UserNotExist extends HTTPException {
    constructor() {
         super(404, "User Does not Exist")
    }
}

export default UserNotExist;