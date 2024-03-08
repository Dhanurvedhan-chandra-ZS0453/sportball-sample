require("dotenv").config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_PORT: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DIALECT,
};