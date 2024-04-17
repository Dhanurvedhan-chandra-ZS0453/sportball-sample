const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const parents = sequelize.define(
    "parents",
    {
      parent_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      parent_email: {
        type: DataTypes.STRING(50),
      },
      parent_mobile: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      parent_street_address: {
        type: DataTypes.STRING(50),
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "parents",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
    }
  );

  return parents;
};
