export class StackVerifyError extends Error {
  status?: number;
  code?: string;
  requestId?: string;

  constructor(
    message: string,
    status?: number,
    code?: string,
    requestId?: string
  ) {
    super(message);
    this.name = "StackVerifyError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}
