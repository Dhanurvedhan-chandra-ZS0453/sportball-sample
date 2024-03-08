const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const db = {};

const allusers = require("./allusers.model")(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.allusers = allusers;



module.exports = db;