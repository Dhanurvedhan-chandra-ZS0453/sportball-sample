// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {

//       await queryInterface.createTable('countries', { 
//         country_id: {
//           type: Sequelize.INTEGER,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         country_name: {
//           type: Sequelize.STRING(50),
//           allowNull: false,
//         },
//         created_by: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//         },
//         updated_by: {
//           type: Sequelize.INTEGER,
//           //allowNull: false
//         },
//       },
//       {
//         tableName: "countries",
//         timestamps: true,
//         createdAt: "created_at",
//         updatedAt: "updated_at",
//         freezeTableName: true,
      
//        });
//   },

//   async down (queryInterface, Sequelize) {

//      await queryInterface.dropTable('countries');
//   }
// };
