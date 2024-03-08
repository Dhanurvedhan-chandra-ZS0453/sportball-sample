const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

module.exports = function (sequelize) {

    const AllUser = sequelize.define('all_user', {
            Id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
            },
            name: {
              type: DataTypes.STRING(50),
            //   allowNull: false
            },
            email: {
              type: DataTypes.STRING(50),
            //   allowNull: false
            }
          }, { 
            tableName: 'all_user' ,
            timestamps: false,
          });

          return AllUser;
}