const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const children = sequelize.define(
    "children",
    {
      child_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      child_dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      child_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    }   ,
    {
      tableName: "children",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
    }
  );

  return children;
};
