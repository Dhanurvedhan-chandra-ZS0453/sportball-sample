const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const registrations = sequelize.define(
    "registrations",
    {
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "registrations",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
    }
  );

  return registrations;
};
