const config = require("../config/config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    // logging: false
    // "migrationStorage": "json",
    // "migrationStoragePath": "migration.json",
    // "migrationStorageTableName": "sample_meta",
    // "migrationStorageTableSchema": "sample_schema"
    migrationStorageTableName: "_migrations",
    // logging: false,
  },

);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
sequelize.sync();
module.exports = sequelize;
