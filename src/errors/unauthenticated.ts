import { CustomAPIError } from './custom-api-errors';
import { HttpStatus } from '@nestjs/common';

export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
    // memberikan statusCode not found
  }
}
