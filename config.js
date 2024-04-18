require("dotenv").config();

module.exports = {
  SERVER_PORT: '3002',
  DB_PORT: '1433',
  host: 'localhost',
  database: 'sportball_sample',
  username: 'sa',
  password: 'Chennai@12345',
  //  dialect: process.env.DIALECT,
  dialect: 'mssql',
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  // },
};