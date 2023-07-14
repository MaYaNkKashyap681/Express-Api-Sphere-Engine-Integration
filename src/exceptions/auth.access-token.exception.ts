import HttpException from "./http.exception";

class WrongAuthTokenPassedException extends HttpException {
  constructor() {
    super(401, `wrong auth token -passed`);
  }
}

export default WrongAuthTokenPassedException;
