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
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { CreateBookingDTO, IntBooking } from 'src/validators/booking.validator';
import { BookingService } from './booking.service';
import { UserService } from 'src/user/user.service';
import { NotFoundError } from 'src/errors';
import { PatientService } from 'src/patient/patient.service';
import * as moment from 'moment';
import { GenerateService } from 'src/misc/barcode_generator';
import { UUID } from 'crypto';
import { Booking } from 'src/models';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
    private readonly generateService: GenerateService,
  ) {}

  @Get()
  async index(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result: { rows: IntBooking[]; count: Number } =
        await this.bookingService.index();

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Post()
  async create(
    @Body() BookingDTO: CreateBookingDTO,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userId = req.user.id;

      const doctor = await this.userService.findById(BookingDTO.doctorId);
      if (!doctor) throw new NotFoundError('Doctor Not Found');

      const patient = await this.patientService.getById(BookingDTO.patientId);
      if (!patient || patient.ownerId != userId)
        throw new NotFoundError('Patient Not Found');

      const owner = await this.userService.findById(userId);

      // create booking id with epoch time created, firstName and random number
      const date = Date.now();
      const random = Math.floor(Math.random() * 101);
      const bookingId = `${owner.firstName}` + `_${random}` + `${date}`;

      // formatting dateIn from req body
      const dateFormatted = moment(BookingDTO.date).format(
        'YYYY-MM-DD HH:mm:ss.SSS Z',
      );

      const queueNumber: number =
        await this.bookingService.countBooking(dateFormatted);

      const data: IntBooking = {
        ...BookingDTO,
        id: bookingId,
        queueNumber: queueNumber + 1,
        isScanned: false,
        isDone: false,
      };
      const result: IntBooking = await this.bookingService.create(data);

      const barcode = await this.generateService.Barcode(
        bookingId,
        `${owner.email}`,
        `${doctor.firstName}`,
        `${owner.firstName}`,
      );

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        barcode: barcode,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Get(':bookingId/:status')
  async statusBooking(
    @Param('bookingId') bookingId: UUID,
    @Param('status') status: String,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const oldData: Booking = await this.bookingService.getById(bookingId);
      const newData: IntBooking = {
        ...oldData,
        isScanned: status === 'scan' ? true : oldData.isScanned,
        isDone:
          status === 'done' && oldData.isScanned === true
            ? true
            : oldData.isDone,
      };

      const result: IntBooking = await this.bookingService.statusBooking(
        oldData,
        newData,
      );
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
