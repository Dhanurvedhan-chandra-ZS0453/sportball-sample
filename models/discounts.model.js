const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const discounts = sequelize.define(
    "discounts",
    {
      discount_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      discount_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
      tableName: "discounts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
    }
  );
  // (async () => {
  //   try {
  //     await discounts.sync({ alter: true });
  //     console.log("Table structure updated successfully.");
  //   } catch (error) {
  //     console.error("Error updating table structure:", error);
  //   } finally {
  //     // Close the Sequelize connection
  //     //  Sequelize.close();
  //   }
  // })();
  return discounts;
};
