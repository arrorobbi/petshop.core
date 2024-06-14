import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

dotenv.config(); // this loads the environment variables from the .env file

export const sequelizeConfig: SequelizeModuleOptions =
  process.env.NODE_ENV === 'production'
    ? {
        dialect: process.env.DB_CONNECTION as any,
        host: process.env.PG_PROD_HOST,
        port: parseInt(process.env.PG_PROD_PORT, 10),
        username: process.env.PG_PROD_USER,
        password: process.env.PG_PROD_PASSWORD,
        database: process.env.PG_PROD_DB_NAME,
        autoLoadModels: true,
        synchronize: true, // Disable auto-sync when using migrations
      }
    : {
        dialect: process.env.DB_CONNECTION as any,
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT, 10),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB_NAME,
        autoLoadModels: true,
        synchronize: true,
      };
