import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access to the resource") {
    super(message, 401);
  }
}
