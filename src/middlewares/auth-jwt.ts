// import { NextFunction, Request } from 'express';

// const jwt = require('jsonwebtoken');
// import * as jwt from 'jsonwebtoken';
// import { UnauthorizedError, UnauthenticatedError } from 'src/errors';

// const JwtGuard = async (req: Request, res: Response, next: NextFunction) => {
//   // Get token value to the json body
//   let token = undefined;
//   // If the token is present
//   try {
//     if (!req.headers.authorization)
//       throw new UnauthorizedError('Not Authorized');
//     token = req.headers.authorization.split(' ')[1];
//     // Verify the token using jwt.verify method
//     const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     // if (decode.role != 1) throw new Error('User not permitted')
//     //  Return response with decode data
//     req.user = decode;
//     req.log.info(decode);
//     next();
//   } catch (error) {
//     // Return response with error
//     next(error);
//   }
// };

// const secureID = async () => {
//   if (!req.headers.authorization)
//     throw new UnauthenticatedError('Not Authorized');
//   token = req.headers.authorization.split(' ')[1];
//   // Verify the token using jwt.verify method
//   const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
// };

// module.exports = {
//   JwtGuard,
//   secureID,
// };
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
