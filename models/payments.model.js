const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const payments = sequelize.define(
    "payments",
    {
      payment_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      payment_transaction_number: {
        type: DataTypes.DOUBLE,
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
      tableName: "payments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
    }
  );
  // (async () => {
  //   try {
  //     await payments.sync({ alter: true });
  //     console.log("Table structure updated successfully.");
  //   } catch (error) {
  //     console.error("Error updating table structure:", error);
  //   } finally {
  //     // Close the Sequelize connection
  //     //  Sequelize.close();
  //   }
  // })();
  return payments;
};
