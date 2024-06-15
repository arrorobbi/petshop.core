import { Body, Controller, Next, Post, Res, HttpStatus } from '@nestjs/common';
import { BcryptService } from '../misc/bcrypt';
import { UserService } from '../user/user.service';
import { LoginDTO } from 'src/validators/user.validator';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { BadRequestError } from 'src/errors/bad-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body() LoginDTO: LoginDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { phoneNumber, password } = LoginDTO;

      const foundUser = await this.userService.findOne(phoneNumber);

      if (foundUser) {
        // bcrypt comparing with database
        const isValidPassword = await BcryptService.bcryptCompare(
          password,
          foundUser.password,
        );
        if (isValidPassword) {
          const payload = {
            // id: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            phoneNumber: foundUser.phoneNumber,
            email: foundUser.email,
            role: foundUser.role,
            isActive: foundUser.isActive,
          };
          // sign jwt for response
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h',
          });
          return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            token: token,
          });
        } else {
          throw new BadRequestError('Wrong email or password');
        }
      } else {
        throw new BadRequestError('Wrong email or password');
      }
    } catch (error) {
      next(error);
    }
  }
}
