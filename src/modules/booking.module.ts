import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BookingController } from 'src/booking/booking.controller';
import { BookingService } from 'src/booking/booking.service';
import { JwtGuard } from 'src/middlewares/auth-jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from '../models/booking';
import { User } from '../models/user';

@Module({
  imports: [SequelizeModule.forFeature([Booking, User])], //import model
  controllers: [BookingController], // import controller that needed in this module
  providers: [BookingService], // import services that used in controller
})
export class BookingModule {
  // set middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtGuard)
      .forRoutes({ path: 'booking', method: RequestMethod.POST }); // Apply middleware
  }
}
