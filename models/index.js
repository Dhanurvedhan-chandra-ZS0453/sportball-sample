const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const db = {};

const allusers = require("./allusers.model")(sequelize);
const seasons = require("./seasons.model")(sequelize);
const cities = require("./cities.model")(sequelize);
const states = require("./states.model")(sequelize);
const countries = require("./countries.model")(sequelize);
const parents = require("./parents.model")(sequelize);
const children = require("./children.model")(sequelize);
// const participation = require("./participation.model")(sequelize);
const registrations = require("./registrations.model")(sequelize);
const payments = require("./payments.model")(sequelize);
const discounts = require("./discounts.model")(sequelize);
const products = require("./products.model")(sequelize); 
const merchants = require("./merchants.model")(sequelize);
const programs = require("./programs.model")(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.allusers = allusers;
db.seasons = seasons;
db.cities = cities;
db.states = states;
db.countries = countries;
db.parents = parents;
db.children = children;
// db.participation = participation;
db.registrations = registrations;
db.payments = payments;
db.discounts = discounts;
db.products = products;
db.merchants = merchants;
db.programs = programs;

// ------------Defining relations----------


// cities.hasMany(programs, {
//   as: "cityId",
//   foreignKey: { allowNull: false },
// });

//------------child table------------
parents.hasMany(children, {
  // as: "parentId",
  foreignKey: { allowNull: false },
});
children.belongsTo(parents, {
  // as: "parent_city",
  foreignKey: { allowNull: false },
});
//------------parents table------------

parents.belongsTo(cities, {
  // as: "parent_city",
  foreignKey: { allowNull: false },
});

parents.belongsTo(states, {
  // as: "parent_state",
  foreignKey: { allowNull: false },
});

parents.belongsTo(countries, {
  // as: "parent_country",
  foreignKey: { allowNull: false },
});

//------------participation table------------
// children.hasMany(participation, {
//   as: "child_id",
//   foreignKey: { allowNull: false },
// });

// seasons.hasMany(participation, {
//   as: "season_id",
//   foreignKey: { allowNull: false },
// });

//------------cities table------------
states.hasMany(cities, {
  // as:'state_id',
  foreignKey: { allowNull: false },
});

//------------states table------------
countries.hasMany(states, {
  // as:'country_id',
  foreignKey: { allowNull: false },
});

// parents.hasMany(registrations, {
//   as: 'parent_id',
//   foreignKey: { allowNull: false },
// });

//------------registration table------------
registrations.belongsTo(children, {
  // as: 'child_id',
  foreignKey: { allowNull: false },
});

registrations.belongsTo(seasons, {
  // as: "season_id",
  foreignKey: { allowNull: false },
});

registrations.belongsTo(payments, {
  // as: "payment_id",
  foreignKey: {allowNull: false},
});

programs.hasMany(registrations, {
  // as: "payment_id",
  foreignKey: {allowNull: false},
});
// registrations.belongsTo(seasons, {
//   as: "season_id",
//   foreignKey: {allowNull: false},
// });

//------------payments table------------
discounts.hasMany(payments, {
  // as: "discount_id",
  // foreignKey: { allowNull: false },
});

//------------products table------------
products.belongsTo(programs, {
  // as:"program_id",
  foreignKey: { allowNull: false },
});

products.belongsTo(merchants, {
  // as: "merchant_id",
  foreignKey: {allowNull: false },
});

//------------programs table------------
programs.belongsTo(cities, {
  // as: "program_city",
  foreignKey: { allowNull: false },
});

programs.belongsTo(states, {
  // as: "program_state",
  foreignKey: {allowNull: false },
});

programs.belongsTo(countries, {
  // as: "program_country",
  foreignKey: { allowNull: false },
});

programs.belongsTo(seasons, {
  foreignKey: { allowNull: false },
});

module.exports = db;