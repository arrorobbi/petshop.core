import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Param,
  Next,
  Body,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { NextFunction, Response } from 'express';
import { IntUser, CreateUserDTO } from 'src/validators/user.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result: { rows: IntUser[]; count: Number } =
        await this.userService.index();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Post('register')
  async create(
    @Body() UserDTO: CreateUserDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const data: IntUser = {
        ...UserDTO,
        isActive: false,
      };
      const result: IntUser = await this.userService.create(data);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
