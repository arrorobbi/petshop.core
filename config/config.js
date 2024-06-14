require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    host: process.env.PG_HOST,
    dialect: process.env.DB_CONNECTION,
    port: process.env.PG_PORT,
  },
  production: {
    username: process.env.PG_PROD_USER,
    password: process.env.PG_PROD_PASSWORD,
    database: process.env.PG_PROD_DB_NAME,
    host: process.env.PG_PROD_HOST,
    port: process.env.PG_PROD_PORT,
    dialect: process.env.DB_CONNECTION,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
