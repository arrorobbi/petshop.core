import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from 'src/middlewares/auth-jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from '../sequelize.config';
import { User } from '../models/user';
import { Address } from '../models/address';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig), //use sequelize config
    SequelizeModule.forFeature([User, Address]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtGuard)
      .forRoutes({ path: 'user', method: RequestMethod.GET }); // Apply middleware to the GET /user route
  }
}
