import HttpException from "./http.exception";

class UnauthorizedException extends HttpException {
  constructor(id: string) {
    super(404, `User with id ${id} not found`);
  }
}

export default UnauthorizedException;
