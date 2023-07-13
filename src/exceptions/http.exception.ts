class HTTPException extends Error {
  status: number;
  message: string;

  constructor(_status: number, _message: string) {
    super(_message);
    this.status = _status;
    this.message = _message;
  }
}

export default HTTPException;
