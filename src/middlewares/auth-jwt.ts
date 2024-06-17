import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/unauthorized'; // Adjust path as needed

declare module 'express' {
  interface Request {
    user?: any; // Adjust the type of user as per your decoded token structure
  }
}

@Injectable()
export class JwtGuard implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new UnauthorizedError('Not Authorized');
      }

      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Extend Request interface to include user property
      req.user = decoded;

      next();
    } catch (error) {
      // Handle errors or throw custom exceptions
      throw new UnauthorizedException('Invalid token');
    }
  }
}
