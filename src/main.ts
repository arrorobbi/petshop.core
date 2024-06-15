import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { AllExceptionsFilter } from 'src/middlewares/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(morgan('dev'));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
