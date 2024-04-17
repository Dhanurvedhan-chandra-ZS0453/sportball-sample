const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {

    const AllUser = sequelize.define('all_user', {
      auth_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
          }, { 
            tableName: 'all_user' ,
          });
 (async () => {
    // try {
    //   await AllUser.sync({ alter: true });
    //   console.log("Table structure updated successfully.");
    // } catch (error) {
    //   console.error("Error updating table structure:", error);
    // } finally {
    //   // Close the Sequelize connection
    //   //  Sequelize.close();
    // }
  })();
          return AllUser;
}