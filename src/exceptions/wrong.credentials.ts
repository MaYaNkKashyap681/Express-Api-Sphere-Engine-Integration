import HTTPException from "./http.exception";

class WrongCredentials extends HTTPException {
    constructor() {
        super(401, "Wrong Credentials")
    }
}

export default WrongCredentials