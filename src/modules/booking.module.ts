import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BookingController } from 'src/booking/booking.controller';
import { BookingService } from 'src/booking/booking.service';
import { JwtGuard } from 'src/middlewares/auth-jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from '../models/booking';
import { UserService } from 'src/user/user.service';
import { Address, Patient, User } from 'src/models';
import { PatientService } from 'src/patient/patient.service';
import { GenerateService } from 'src/misc/barcode_generator';
import { MailService } from 'src/misc/mailer';

@Module({
  imports: [SequelizeModule.forFeature([Booking, User, Address, Patient])], //import model
  controllers: [BookingController], // import controller that needed in this module
  providers: [
    BookingService,
    UserService,
    PatientService,
    GenerateService,
    MailService,
  ], // import services that used in controller
})
export class BookingModule {
  // set middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtGuard)
      .forRoutes(
        { path: 'booking', method: RequestMethod.POST },
        { path: 'booking', method: RequestMethod.GET },
        { path: 'booking/:bookingId/:status', method: RequestMethod.GET },
      ); // Apply middleware
  }
}
