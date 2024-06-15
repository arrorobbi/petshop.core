import { CustomAPIError } from './custom-api-errors';
import { HttpStatus } from '@nestjs/common';

export class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
    // memberikan statusCode not found
  }
}
