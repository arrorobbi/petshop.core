// import { NextFunction } from 'express';

// const jwt = require('jsonwebtoken');
// const { UnauthorizedError, UnauthenticatedError } = require('../errors');

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
