import HTTPException from "./http.exception";

class WrongCredentials extends HTTPException {
    constructor() {
        super(400, "Wrong Credentials")
    }
}

export default WrongCredentials