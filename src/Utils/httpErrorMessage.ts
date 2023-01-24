export default class HttpErrorMessage extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}