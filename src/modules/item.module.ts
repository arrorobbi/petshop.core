import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtGuard } from 'src/middlewares/auth-jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from 'src/models';
import { ItemController } from 'src/item/item.controller';
import { ItemService } from 'src/item/item.service';

@Module({
  imports: [SequelizeModule.forFeature([Item])], //import model
  controllers: [ItemController], // import controller that needed in this module
  providers: [ItemService], // import services that used in controller
})
export class ItemModule {
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
