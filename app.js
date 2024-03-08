// // require('dotenv').config();
// const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// // const passport = require('./src/shared/passport');
// const app = express();
// const port = 3002;
// const { Sequelize, DataTypes  } = require('sequelize');
// // const sql = require('mssql');
// // const cors = require('cors');
// // const routes = require('./src/routes/routes');

// // app.use(cors());
// // const azureDomain = new RegExp(
// //   `https://login.microsoftonline.com/[a-z0-9]*.onmicrosoft.com/v2.0/.well-known/openid-configuration`
// // );
// // app.use(cors(
// //   {
// //     origin: [azureDomain, 'http://localhost:3002'],
// //     methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
// //     allowedHeaders:
// //       "Origin, Accept, X-Requested-With, Content-Type, Authorization, Cache-Control, Engaged-Auth-Token",
// //     credentials: true,
// //   }
// // ));

// // const config = {
// //     user: 'sa',
// //     password: 'Password@123',
// //     server: 'ZSCHN01LP0336',
// //     database: 'sportball_sample',
// //     options: {
// //         encrypt: true // For Azure SQL Database
// //     }
// // };
// app.use(
//     session({
//       secret: 'qwertyqwertyqwerty',
//       resave: true,
//       saveUninitialized: true,
//     })
//   );
//   const sequelize = new Sequelize('sportball_sample', 'sa', 'Password@123', {
//     host: 'localhost',
//     dialect: 'mssql',
//     port: 1433,
//     dialectOptions: {
//       options: {
//         encrypt: true, 
//       },
//     },
//     // logging: console.log, // Enable logging
//   });
//   app.use(express.urlencoded({ extended: true }));
// //   app.use(passport.initialize());
// //   app.use(passport.session());
//   app.use(cookieParser());
//   app.use(express.json());
//   sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });
// //   sql.connect(config)
// //     .then(pool => {
// //         console.log('Connected to SQL Server');
// //         // You can execute queries or perform other database operations here
// //     })
// //     .catch(err => {
// //         console.error('Failed to connect to SQL Server:', err);
// //     });

//     // sql.close();
// //   app.use('/', routes);

// const SportballUser = sequelize.define('sportball_users', {
//     ID: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     Name: {
//       type: DataTypes.STRING(50),
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING(50),
//       allowNull: false
//     },
//     mobile: {
//       type: DataTypes.FLOAT,
//       allowNull: false
//     }
//   }, {
//     tableName: 'sportball_users' 
//   });
  

//   const AllUser = sequelize.define('all_user', {
//     Id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING(50),
//     //   allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING(50),
//     //   allowNull: false
//     }
//   }, { 
//     tableName: 'all_user' ,
//     timestamps: false,
//   });
  
// //   async function getAllSportballUsers() {
// //     try {
// //       const users = await AllUser.findAll();
// //       console.log(users.dataValues);
// //       return users;
// //     } catch (error) {
// //       console.error('Error fetching sportball users:', error);
// //     }
// //   }
// app.get('/', async (req, res) => {
// //    const users= getAllSportballUsers();
// //    console.log(users);
// //         res.status(200).json(users);
// const allUsers = await AllUser.findAll();
// res.status(200).json({
//     message: "Fetched allCategory",
//     category: allUsers,
//   });
//   });
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
const env = require("dotenv").config();
const express = require("express");
const config = require("./config/config");
const router = require("./router/index");

const app = express();
const PORT = config.SERVER_PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});