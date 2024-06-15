import { CustomAPIError } from './custom-api-errors';
import { HttpStatus } from '@nestjs/common';

export class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
    // memberikan statusCode not found
  }
}
