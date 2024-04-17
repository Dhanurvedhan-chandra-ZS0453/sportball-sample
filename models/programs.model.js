const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {
  const programs = sequelize.define(
    "programs",
    {
       program_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      program_description: {
        type: DataTypes.STRING(50),
      },
      program_image: {
        type: DataTypes.STRING(50),
      },
      program_season: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      program_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      program_days: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      program_age_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      program_no_of_classes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      program_duration: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      program_venue: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      program_street_address: {
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
      tableName: "programs",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
    }
  );
  //  (async () => {
  //     try {
  //       await programs.sync({ alter: true });
  //       console.log("Table structure updated successfully.");
  //     } catch (error) {
  //       console.error("Error updating table structure:", error);
  //     } finally {
  //       // Close the Sequelize connection
  //       //  Sequelize.close();
  //     }
  //   })();

  return programs;
};
