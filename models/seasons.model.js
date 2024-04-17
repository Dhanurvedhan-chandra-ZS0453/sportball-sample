const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const Seasons = sequelize.define(
    "seasons",
    {
      season_name: {
        type: DataTypes.STRING(50),
           allowNull: false
      },
      season_start_month: {
        type: DataTypes.STRING(50),
           allowNull: false
      },
      season_end_month: {
        type: DataTypes.STRING(50),
           allowNull: false
      },
      created_by: {
        type: DataTypes.INTEGER,
           allowNull: false
      },
      updated_by: {
        type: DataTypes.INTEGER,
      }
    },
    {
      tableName: "seasons",
      timestamps: true,
      createdAt: 'created_at', 
  updatedAt: 'updated_at',
      freezeTableName: true
    }
  );
  // (async () => {
  //   try {
  //     await Seasons.sync({ alter: true });
  //     console.log("Table structure updated successfully.");
  //   } catch (error) {
  //     console.error("Error updating table structure:", error);
  //   } finally {
  //     // Close the Sequelize connection
  //     //  Sequelize.close();
  //   }
  // })();

  return Seasons;
};

