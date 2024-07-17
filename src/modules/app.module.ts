import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UserModule } from 'src/modules/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from '../sequelize.config';
import { PatientModule } from './patient.module';
import { BookingModule } from './booking.module';
import { PetHotelModule } from './pet-hotel.module';
import { ItemModule } from './item.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','..', 'public'),  // path to the public folder
  }),
    SequelizeModule.forRoot(sequelizeConfig), //use sequelize config
    UserModule,
    PatientModule,
    BookingModule,
    PetHotelModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
