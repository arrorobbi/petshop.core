import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PatientController } from 'src/patient/patient.controller';
import { PatientService } from 'src/patient/patient.service';
import { JwtGuard } from 'src/middlewares/auth-jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from '../models/patient';
import { User } from '../models/user';

@Module({
  imports: [SequelizeModule.forFeature([Patient, User])], //import model
  controllers: [PatientController], // import controller that needed in this module
  providers: [PatientService], // import services that used in controller
})
export class PatientModule {
  // set middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtGuard)
      .forRoutes(
        { path: 'patient', method: RequestMethod.POST },
        { path: 'patient/owner', method: RequestMethod.GET },
        { path: 'patient/:petName', method: RequestMethod.GET },
        { path: 'patient/:patientId', method: RequestMethod.PATCH },
        { path: 'patient/:patientId', method: RequestMethod.DELETE },
      ); // Apply middleware
  }
}
