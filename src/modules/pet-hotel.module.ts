import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtGuard } from 'src/middlewares/auth-jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking, User, Patient, PetHotel } from 'src/models';
import { PetHotelController } from 'src/pet-hotel/pet-hotel.controller';
import { PetHotelService } from 'src/pet-hotel/pet-hotel.service';

@Module({
  imports: [SequelizeModule.forFeature([PetHotel, Booking, Patient, User])], //import model
  controllers: [PetHotelController], // import controller that needed in this module
  providers: [PetHotelService], // import services that used in controller
})
export class PetHotelModule {
  // set middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtGuard).forRoutes(); // Apply middleware
  }
}
