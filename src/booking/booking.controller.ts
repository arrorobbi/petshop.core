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
  UseGuards,
} from '@nestjs/common';
import * as fs from 'fs';
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
import { Sequelize } from 'sequelize-typescript';
import { UserRole } from 'config/enum/role.enum';
import { Role } from 'config/decorators/roles.decorator';
import { RoleGuard } from 'src/middlewares/role-guard';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
    private readonly generateService: GenerateService,
    private readonly sequelize: Sequelize,
  ) {}

  @Get()
  @Role(UserRole.doctor)
  @UseGuards(RoleGuard)
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

  @Post() // issue on transaction cause not created but need lookup bookingId on send email
  @Role(UserRole.owner)
  @UseGuards(RoleGuard)
  async create(
    @Body() BookingDTO: CreateBookingDTO,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let bookingId: string;
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

      const inputDate = BookingDTO.date;
      // formatting dateIn from req body
      const dateFormatted = moment(BookingDTO.date, moment.ISO_8601).format(
        'YYYY-MM-DD HH:mm:ss.SSS',
      );

      const queueNumber: number = await this.bookingService.countBooking(
        `${dateFormatted}` + ' +07:00',
      );

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
  @Role(UserRole.admin)
  @UseGuards(RoleGuard)
  async statusBooking(
    @Param('bookingId') bookingId: UUID,
    @Param('status') status: String,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      await this.sequelize.transaction(async (t) => {
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
          t,
        );
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: 'Request Success',
          data: result,
        });
      });
    } catch (error) {
      next(error);
    }
  }
}
