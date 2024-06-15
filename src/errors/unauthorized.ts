import { CustomAPIError } from './custom-api-errors';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
    // memberikan statusCode not found
  }
}
