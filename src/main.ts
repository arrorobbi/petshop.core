import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { AllExceptionsFilter } from 'src/middlewares/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe()); // validation DTO and interface
  app.useGlobalFilters(new AllExceptionsFilter()); // error middleware
  app.use(morgan('dev')); // logger
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
