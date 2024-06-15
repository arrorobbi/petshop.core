import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from 'src/middlewares/auth-jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user';
import { Address } from '../models/address';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Address])], //import model
  controllers: [UserController, AuthController], // import controller that needed in this module
  providers: [UserService], // import services that used in controller
})
export class UserModule {
  // set middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtGuard)
      .forRoutes({ path: 'user', method: RequestMethod.GET }); // Apply middleware to the GET /user route
  }
}
