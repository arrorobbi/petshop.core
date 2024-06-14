// import { NextFunction } from 'express';

// const { UnauthorizedError } = require('../errors');

// // Middleware for role validation
// const RoleGuard = (requiredRole1, requiredRole2) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userData = req.user;
//       const userRole = userData.role;

//       if (userRole === requiredRole1 && userData.isActive === true) {
//         next(); // User has the required role, proceed to the next middleware or route handler
//       } else if (userRole === requiredRole2 && userData.isActive === true) {
//         next();
//       } else throw new UnauthorizedError('Access Forbidden'); // User does not have the required role
//     } catch (err) {
//       next(err);
//     }
//   };
// };

// module.exports = {
//   RoleGuard,
// };
