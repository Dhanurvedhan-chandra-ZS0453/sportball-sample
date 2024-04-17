const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const cities = sequelize.define(
    "cities",
    {
      city_name: {
        type: DataTypes.STRING(50),
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
      tableName: "cities",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
    }
  );
//  (async () => {
//     try {
//       await cities.sync({ alter: true });
//       console.log("Table structure updated successfully.");
//     } catch (error) {
//       console.error("Error updating table structure:", error);
//     } finally {
//       // Close the Sequelize connection
//       //  Sequelize.close();
//     }
//   })();
  return cities;
};
