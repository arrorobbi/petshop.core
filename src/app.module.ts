import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './sequelize.config';
import { User } from './models/user';
import { Address } from './models/address';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig), //use sequelize config
    SequelizeModule.forFeature([User, Address]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
