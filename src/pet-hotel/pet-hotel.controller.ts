import {
  Controller,
  Get,
  Next,
  Res,
  HttpStatus,
  Post,
  Body,
  Req,
  Param,
  Patch,
  Delete,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from 'src/errors';
import { PetHotelService } from './pet-hotel.service';
import { IntPetHotel } from 'src/validators/petHotel.validator';

@Controller('pet-hotel')
export class PetHotelController {
  constructor(private readonly petHotelService: PetHotelService) {}

  @Get()
  async index(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result: { rows: IntPetHotel[]; count: Number } =
        await this.petHotelService.index();
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
