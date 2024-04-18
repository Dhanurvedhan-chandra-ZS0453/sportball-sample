/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const env = (__webpack_require__(/*! dotenv */ \"dotenv\").config)();\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst config = __webpack_require__(/*! ./config */ \"./config.js\");\r\nconst router = __webpack_require__(/*! ./router/index */ \"./router/index.js\");\r\n\r\n\r\nconst app = express();\r\nconst PORT = config.SERVER_PORT;\r\napp.use(express.urlencoded({ extended: true }));\r\napp.use(express.json());\r\napp.use(router);\r\n\r\n\r\n// let transporter = nodemailer.createTransport({\r\n//   service: \"gmail\",\r\n//   auth: {\r\n//     type: \"OAuth2\",\r\n//     user: process.env.EMAIL,\r\n//     pass: process.env.WORD,\r\n//     clientId: process.env.OAUTH_CLIENTID,\r\n//     clientSecret: process.env.OAUTH_CLIENT_SECRET,\r\n//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,\r\n//   },\r\n//  });\r\n// transporter.verify((err, success) => {\r\n//   err\r\n//     ? console.log(err)\r\n//     : console.log(`=== Server is ready to take messages: ${success} ===`);\r\n//  });\r\n\r\napp.listen(PORT, () => {\r\n  console.log(`Server is running on port ${PORT}`);\r\n});\n\n//# sourceURL=webpack://sportball-sample/./app.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\r\n\r\nmodule.exports = {\r\n  SERVER_PORT: '3002',\r\n  DB_PORT: '1433',\r\n  host: 'localhost',\r\n  database: 'sportball_sample',\r\n  username: 'sa',\r\n  password: 'Chennai@12345',\r\n  //  dialect: process.env.DIALECT,\r\n  dialect: 'mssql',\r\n  // pool: {\r\n  //   max: 5,\r\n  //   min: 0,\r\n  //   acquire: 30000,\r\n  //   idle: 10000, \r\n  // },\r\n};\n\n//# sourceURL=webpack://sportball-sample/./config.js?");

/***/ }),

/***/ "./controllers/addChildren.js":
/*!************************************!*\
  !*** ./controllers/addChildren.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst { children, parents } = db; \r\n\r\nmodule.exports = {\r\n  addChildren: async (req, res) => {\r\n    const { child_name, child_dob, child_age, parent_name, parent_email, parent_mobile, parent_street_address, \r\n        cityId, stateId, countryId, created_by } = req.body;\r\n\r\n    const transaction = await db.sequelize.transaction();\r\n    \r\n    try {\r\n      let newParent;\r\n      const existingParent = await parents.findOne({ where: { parent_email } });\r\n\r\n      if (existingParent) {\r\n        newParent = existingParent;\r\n      } else {\r\n        newParent = await parents.create({\r\n          parent_name,\r\n          parent_email,\r\n          parent_mobile,\r\n          parent_street_address,\r\n          cityId,\r\n          stateId,\r\n          countryId,\r\n          created_by,\r\n        }, { transaction });\r\n      }\r\n\r\n      const newChild = await children.create({\r\n        child_name,\r\n        child_dob,\r\n        child_age,\r\n        parentId: newParent.id, \r\n        created_by,\r\n      }, { transaction });\r\n\r\n      await transaction.commit();\r\n\r\n      res.status(200).json({\r\n        message: \"Child and Parent added successfully\",\r\n        child: newChild,\r\n        parent: newParent\r\n      });\r\n    } catch (error) {\r\n      console.log(error);\r\n      await transaction.rollback();\r\n\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addChildren.js?");

/***/ }),

/***/ "./controllers/addPayments.js":
/*!************************************!*\
  !*** ./controllers/addPayments.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst payments = db.payments;\r\n\r\nmodule.exports = {\r\n  addPayments: async (req, res) => {\r\n    const { payment_amount, payment_status, payment_transaction_number, discountId, created_by } =\r\n      req.body;\r\n    try {\r\n      const newPayments = await payments.create({\r\n        payment_amount,   \r\n        payment_status,\r\n        payment_transaction_number,\r\n        discountId,\r\n        created_by,\r\n      });\r\n\r\n      if (newPayments) {\r\n        res.status(200).json({\r\n          message: \"Payment successfull\",\r\n          season: newPayments,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n  updatePayments: async (req, res) => {\r\n    const {  payment_amount, payment_status, payment_transaction_number, discountId, updated_by } =\r\n      req.body;\r\n      const { id } = req.query;\r\n      console.log(id);\r\n    try {\r\n      const updatedPayment = await payments.update({\r\n        payment_amount,   \r\n        payment_status,\r\n        payment_transaction_number,\r\n        discountId,\r\n        updated_by,\r\n      }, {\r\n        where: { id: id } \r\n      });\r\n       console.log(updatedPayment);\r\n\r\n      if (updatedPayment[0]===1) {\r\n        res.status(200).json({\r\n          message: \"Payment updated successfully\",\r\n          payment: updatedPayment,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Payment not found\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n\r\n  deletePayment: async (req, res) => {\r\n    const { id } = req.query;\r\n    try {\r\n      const deletedPayment = await payments.destroy({\r\n        where: { id: id }\r\n      });\r\n\r\n      if (deletedPayment === 1) {\r\n        res.status(200).json({\r\n          message: \"Payment deleted successfully\",\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Payment not found\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n  findAllPayments: async (req, res) => {\r\n    try {\r\n      const allPayments = await payments.findAll();\r\n\r\n      if (allPayments.length > 0) {\r\n        res.status(200).json({\r\n          message: \"Payments found successfully\",\r\n          payments: allPayments,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"No payments found\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addPayments.js?");

/***/ }),

/***/ "./controllers/addProduct.js":
/*!***********************************!*\
  !*** ./controllers/addProduct.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst products = db.products;\r\n\r\nmodule.exports = {\r\n  addProduct: async (req, res) => {\r\n    const { product_name, product_price, programId, merchantId, created_by } =\r\n      req.body;\r\n    try {\r\n      const newProduct = await products.create({\r\n        product_name,   \r\n        product_price,\r\n        programId,\r\n        merchantId,\r\n        created_by,\r\n      });\r\n\r\n      if (newProduct) {\r\n        res.status(200).json({\r\n          message: \"Product added successfully\",\r\n          season: newProduct,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addProduct.js?");

/***/ }),

/***/ "./controllers/addPrograms.js":
/*!************************************!*\
  !*** ./controllers/addPrograms.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst programs = db.programs;\r\n\r\nmodule.exports = {\r\n  addProgram: async (req, res) => {\r\n    const { program_name, program_description, program_image, program_season, program_price, program_days,\r\n        program_no_of_classes, program_duration, program_venue, program_street_address, cityId,\r\n        stateId, countryId, seasonId, created_by, program_age_category } =\r\n      req.body;\r\n    try {\r\n      const newPrograms = await programs.create({\r\n        program_name,   \r\n        program_description,\r\n        program_image,\r\n        program_season,\r\n        program_price,\r\n        program_days,\r\n        program_no_of_classes,\r\n        program_duration,\r\n        program_venue,\r\n        program_street_address,\r\n        cityId,\r\n        stateId,\r\n        countryId,\r\n        seasonId,\r\n        created_by,\r\n        program_age_category,\r\n      });\r\n\r\n      if (newPrograms) {\r\n        res.status(200).json({\r\n          message: \"Program added successfully\",\r\n          season: newPrograms,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addPrograms.js?");

/***/ }),

/***/ "./controllers/addRegistration.js":
/*!****************************************!*\
  !*** ./controllers/addRegistration.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst registrations = db.registrations;\r\n\r\nmodule.exports = {\r\n  addRegistration: async (req, res) => {\r\n    const { childId, paymentId, programId, seasonId, created_by } =\r\n      req.body;\r\n    try {\r\n      const newRegistration = await registrations.create({\r\n        childId,   \r\n        paymentId,\r\n        programId,\r\n        seasonId,\r\n        created_by,\r\n      });\r\n\r\n      if (newRegistration) {\r\n        res.status(200).json({\r\n          message: \"Registered successfully\",\r\n          season: newRegistration,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addRegistration.js?");

/***/ }),

/***/ "./controllers/addSeasons.js":
/*!***********************************!*\
  !*** ./controllers/addSeasons.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst seasons = db.seasons;\r\n\r\nmodule.exports = {\r\n  addSeasons: async (req, res) => {\r\n    const { season_name, season_start_month, season_end_month, created_by } =\r\n      req.body;\r\n    try {\r\n      const newSeason = await seasons.create({\r\n        season_name,\r\n        season_start_month,\r\n        season_end_month,\r\n        created_by,\r\n      });\r\n\r\n      if (newSeason) {\r\n        res.status(200).json({\r\n          message: \"Season added successfully\",\r\n          season: newSeason,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addSeasons.js?");

/***/ }),

/***/ "./controllers/addcities.js":
/*!**********************************!*\
  !*** ./controllers/addcities.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst cities = db.cities;\r\n\r\nmodule.exports = {\r\n  addCities: async (req, res) => {\r\n    const { city_name, stateId, created_by } =\r\n      req.body;\r\n    try {\r\n      const newCity = await cities.create({\r\n        city_name,\r\n        stateId,\r\n        created_by,\r\n      });\r\n\r\n      if (newCity) {\r\n        res.status(200).json({\r\n          message: \"city added successfully\",\r\n          season: newCity,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addcities.js?");

/***/ }),

/***/ "./controllers/addcountries.js":
/*!*************************************!*\
  !*** ./controllers/addcountries.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst countries = db.countries;\r\n\r\nmodule.exports = {\r\n  addCountries: async (req, res) => {\r\n    const { country_name, created_by } =\r\n      req.body;\r\n    try {\r\n      const newCountry = await countries.create({\r\n        country_name,\r\n        created_by,\r\n      });\r\n\r\n      if (newCountry) {\r\n        res.status(200).json({\r\n          message: \"country added successfully\",\r\n          season: newCountry,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addcountries.js?");

/***/ }),

/***/ "./controllers/adddiscount.js":
/*!************************************!*\
  !*** ./controllers/adddiscount.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst discounts = db.discounts;\r\n\r\nmodule.exports = {\r\n  addDiscount: async (req, res) => {\r\n    const { discount_code, discount_amount, created_by } =\r\n      req.body;\r\n    try {\r\n      const discount = await discounts.create({\r\n        discount_code,\r\n        discount_amount,\r\n        created_by,\r\n      });\r\n\r\n      if (discount) {\r\n        res.status(200).json({\r\n          message: \"discount added successfully\",\r\n          season: discount,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/adddiscount.js?");

/***/ }),

/***/ "./controllers/addmerchants.js":
/*!*************************************!*\
  !*** ./controllers/addmerchants.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst merchants = db.merchants;\r\n\r\nmodule.exports = {\r\n  addMerchants: async (req, res) => {\r\n    const { merchant_name, created_by } =\r\n      req.body;\r\n    try {\r\n      const newMerchant = await merchants.create({\r\n        merchant_name,\r\n        created_by,\r\n      });\r\n\r\n      if (newMerchant) {\r\n        res.status(200).json({\r\n          message: \"Merchant added successfully\",\r\n          season: newMerchant,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addmerchants.js?");

/***/ }),

/***/ "./controllers/addstates.js":
/*!**********************************!*\
  !*** ./controllers/addstates.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst states = db.states;\r\n\r\nmodule.exports = {\r\n  addStates: async (req, res) => {\r\n    const { state_name, countryId, created_by } =\r\n      req.body;\r\n    try {\r\n      const newState = await states.create({\r\n        state_name,\r\n        countryId,\r\n        created_by,\r\n      });\r\n\r\n      if (newState) {\r\n        res.status(200).json({\r\n          message: \"State added successfully\",\r\n          season: newState,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Error\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      res.status(500).json({\r\n        message: \"Error\",\r\n        error: error.message,\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/addstates.js?");

/***/ }),

/***/ "./controllers/allusers.js":
/*!*********************************!*\
  !*** ./controllers/allusers.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst alluser = db.allusers;\r\n\r\n\r\nmodule.exports = {\r\n    allusers: async (req, res) => {\r\n      const allusers = await alluser.findAll();\r\n  \r\n      if (allusers) {\r\n        res.status(200).json({\r\n          message: \"Fetched allUsers\",\r\n          category: allusers,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"User not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/allusers.js?");

/***/ }),

/***/ "./controllers/children.js":
/*!*********************************!*\
  !*** ./controllers/children.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst parent = db.parents;\r\nconst Child = db.children;\r\n\r\nmodule.exports = {\r\n  getChildrenWithParent: async (req, res) => {\r\n    try {\r\n      const childrenWithParent = await Child.findAll({\r\n        include: [\r\n          {\r\n            model:parent,\r\n            // association: \"parentId\",\r\n            required: false,\r\n          },\r\n        ],\r\n      });\r\n\r\n      if (childrenWithParent.length > 0) {\r\n        res.status(200).json({\r\n          message: \"Fetched children with parent\",\r\n          children: childrenWithParent,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"No children found\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      console.error(\"Error fetching children with parent:\", error);\r\n      res.status(500).json({\r\n        message: \"Internal server error\",\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/children.js?");

/***/ }),

/***/ "./controllers/cities.js":
/*!*******************************!*\
  !*** ./controllers/cities.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst cities = db.cities;\r\nconst log  = __webpack_require__(/*! ../util/logger */ \"./util/logger.js\");\r\n\r\nmodule.exports = {\r\n  cities: async (req, res) => {\r\n    try {\r\n\r\n      const city = await cities.findAll();\r\n\r\n      if (city) {\r\n        res.status(200).json({\r\n          message: \"Fetched cities\",\r\n          category: city,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"city not Found\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      if (error.name === \"SequelizeDatabaseError\") {\r\n        log.logError(error, \"Database error occurred\");\r\n        res.status(500).json({\r\n          message: \"Database error occurred\",\r\n        });\r\n      } else {\r\n        log.logError(error, \"Error fetching cities\");\r\n        res.status(500).json({\r\n          message: \"Internal server error\",\r\n        });\r\n      }\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/cities.js?");

/***/ }),

/***/ "./controllers/countries.js":
/*!**********************************!*\
  !*** ./controllers/countries.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst countries = db.countries;\r\n\r\n\r\nmodule.exports = {\r\n    countries: async (req, res) => {\r\n      const country = await countries.findAll();\r\n  \r\n      if (country) {\r\n        res.status(200).json({\r\n          message: \"Fetched countries\",\r\n          category: country,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"country not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/countries.js?");

/***/ }),

/***/ "./controllers/discounts.js":
/*!**********************************!*\
  !*** ./controllers/discounts.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst discounts = db.discounts;\r\n\r\n\r\nmodule.exports = {\r\n    discounts: async (req, res) => {\r\n      const discount = await discounts.findAll();\r\n  \r\n      if (discount) {\r\n        res.status(200).json({\r\n          message: \"Fetched discounts\",\r\n          category: discount,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"discount not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/discounts.js?");

/***/ }),

/***/ "./controllers/eventcount.js":
/*!***********************************!*\
  !*** ./controllers/eventcount.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst programs = db.programs;\r\nconst countries = db.countries;\r\nconst states = db.states;\r\nconst cities = db.cities;\r\nconst seasons = db.seasons;\r\n\r\nmodule.exports = {\r\n    eventCount: async (req, res) => {\r\n        const { country, season, city, state, dob } = req.query;\r\n        // console.log(country);\r\n        // console.log(season);\r\n        // console.log(city);\r\n        let whereClause = {};\r\n        let includeClause = [];\r\n        \r\n        if (country) {\r\n            includeClause.push({\r\n                model: countries,\r\n                attributes: ['country_name'],\r\n                where: { country_name: country } \r\n            });\r\n        }\r\n        if (season) {\r\n            includeClause.push({\r\n                model: seasons,\r\n                attributes: ['season_name'],\r\n                where: { season_name: season } \r\n            });\r\n        }\r\n        if (city) {\r\n            includeClause.push({\r\n                model: cities,\r\n                attributes: ['city_name'],\r\n                where: { city_name: city } \r\n            });\r\n        }\r\n\r\n        if (state) {\r\n            includeClause.push({\r\n                model: states,\r\n                attributes: ['state_name'],\r\n                where: { state_name: state } \r\n            });\r\n        }\r\n\r\n        try {\r\n            const filteredPrograms = await programs.findAll({\r\n                attributes : ['id', 'program_name', 'program_image', 'program_season', 'program_duration'],\r\n                where: whereClause,\r\n                include: includeClause\r\n            });\r\n            const totalCount = await programs.count({\r\n                where: whereClause,\r\n                include: includeClause\r\n            });\r\n\r\n            if (filteredPrograms.length > 0) {\r\n                res.status(200).json({\r\n                    message: \"Fetched programs with filters\",\r\n                    programs: filteredPrograms,\r\n                    count: totalCount\r\n                });\r\n            } else {\r\n                res.status(404).json({\r\n                    message: \"No programs found matching the criteria\"\r\n                });\r\n            }\r\n        } catch (error) {\r\n            console.error(\"Error fetching programs:\", error);\r\n            res.status(500).json({\r\n                message: \"Internal server error\"\r\n            });\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/eventcount.js?");

/***/ }),

/***/ "./controllers/index.js":
/*!******************************!*\
  !*** ./controllers/index.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const controllers = {};\r\ncontrollers.allusers = (__webpack_require__(/*! ./allusers */ \"./controllers/allusers.js\").allusers);\r\ncontrollers.seasons = (__webpack_require__(/*! ./seasons */ \"./controllers/seasons.js\").seasons);\r\ncontrollers.addSeasons = (__webpack_require__(/*! ./addSeasons */ \"./controllers/addSeasons.js\").addSeasons);\r\ncontrollers.cities = (__webpack_require__(/*! ./cities */ \"./controllers/cities.js\").cities);\r\ncontrollers.states = (__webpack_require__(/*! ./states */ \"./controllers/states.js\").states);\r\ncontrollers.countries = (__webpack_require__(/*! ./countries */ \"./controllers/countries.js\").countries);\r\ncontrollers.addcountries = (__webpack_require__(/*! ./addcountries */ \"./controllers/addcountries.js\").addCountries);\r\ncontrollers.addstates = (__webpack_require__(/*! ./addstates */ \"./controllers/addstates.js\").addStates);\r\ncontrollers.addcities = (__webpack_require__(/*! ./addcities */ \"./controllers/addcities.js\").addCities);\r\ncontrollers.addmerchants = (__webpack_require__(/*! ./addmerchants */ \"./controllers/addmerchants.js\").addMerchants);\r\ncontrollers.merchants = (__webpack_require__(/*! ./merchants */ \"./controllers/merchants.js\").merchants);   \r\ncontrollers.discounts = (__webpack_require__(/*! ./discounts */ \"./controllers/discounts.js\").discounts);\r\ncontrollers.addDiscount = (__webpack_require__(/*! ./adddiscount */ \"./controllers/adddiscount.js\").addDiscount);\r\ncontrollers.products = (__webpack_require__(/*! ./product */ \"./controllers/product.js\").products);\r\ncontrollers.addProduct = (__webpack_require__(/*! ./addProduct */ \"./controllers/addProduct.js\").addProduct);\r\ncontrollers.programs = (__webpack_require__(/*! ./programs */ \"./controllers/programs.js\").programs);\r\ncontrollers.addProgram = (__webpack_require__(/*! ./addPrograms */ \"./controllers/addPrograms.js\").addProgram);   \r\ncontrollers.parent = (__webpack_require__(/*! ./parents */ \"./controllers/parents.js\").parents);\r\ncontrollers.children = (__webpack_require__(/*! ./children */ \"./controllers/children.js\").getChildrenWithParent);\r\ncontrollers.addchildren = (__webpack_require__(/*! ./addChildren */ \"./controllers/addChildren.js\").addChildren);\r\ncontrollers.registrations = (__webpack_require__(/*! ./registrations */ \"./controllers/registrations.js\").registrations);\r\ncontrollers.addRegistrations = (__webpack_require__(/*! ./addRegistration */ \"./controllers/addRegistration.js\").addRegistration);\r\ncontrollers.payments = (__webpack_require__(/*! ./payments */ \"./controllers/payments.js\").payments);\r\ncontrollers.addPayments = (__webpack_require__(/*! ./addPayments */ \"./controllers/addPayments.js\").addPayments);\r\ncontrollers.eventcount = (__webpack_require__(/*! ./eventcount */ \"./controllers/eventcount.js\").eventCount);\r\ncontrollers.updatePayments = (__webpack_require__(/*! ./addPayments */ \"./controllers/addPayments.js\").updatePayments);\r\ncontrollers.deletePayments = (__webpack_require__(/*! ./addPayments */ \"./controllers/addPayments.js\").deletePayment);\r\ncontrollers.allPayments = (__webpack_require__(/*! ./addPayments */ \"./controllers/addPayments.js\").findAllPayments);\r\ncontrollers.sendemail = (__webpack_require__(/*! ./sendEmail */ \"./controllers/sendEmail.js\").sendBulkEmail);\r\ncontrollers.outlookmail = (__webpack_require__(/*! ./outlook */ \"./controllers/outlook.js\").outlookmail);\r\n\r\nmodule.exports = controllers;\n\n//# sourceURL=webpack://sportball-sample/./controllers/index.js?");

/***/ }),

/***/ "./controllers/merchants.js":
/*!**********************************!*\
  !*** ./controllers/merchants.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst merchants = db.merchants;\r\n\r\n\r\nmodule.exports = {\r\n    merchants: async (req, res) => {\r\n      const merchant = await merchants.findAll();\r\n  \r\n      if (merchant) {\r\n        res.status(200).json({\r\n          message: \"Fetched merchants\",\r\n          category: merchant,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"merchant not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/merchants.js?");

/***/ }),

/***/ "./controllers/outlook.js":
/*!********************************!*\
  !*** ./controllers/outlook.js ***!
  \********************************/
/***/ (() => {

eval("// const nodemailer = require(\"nodemailer\");\r\n// const { ClientSecretCredential } = require(\"@azure/identity\");\r\n\r\n// module.exports = {\r\n//     outlookmail: async (req, res) => {\r\n//   try {\r\n//     const credentials = new ClientSecretCredential(\r\n//       process.env.AZURE_TENANT_ID,\r\n//       process.env.AZURE_CLIENT_ID,\r\n//       process.env.AZURE_CLIENT_SECRET,\r\n//       { tenantId: process.env.AZURE_TENANT_ID, username: process.env.OUTLOOKEMAIL }\r\n//     );\r\n\r\n//     const tokenCredential = await credentials.getToken(\"https://outlook.office365.com/.default\");\r\n//     console.log(tokenCredential);\r\n\r\n//     const transporter = nodemailer.createTransport({\r\n//       host: \"smtp.office365.com\",\r\n//     //   port: 587,\r\n//     //   secure: false,\r\n//       auth: {\r\n//         type: \"OAuth2\",\r\n//         user: process.env.OUTLOOKEMAIL,\r\n//         accessToken: tokenCredential.token,\r\n//         clientId: process.env.AZURE_CLIENT_ID,\r\n//         clientSecret: process.env.AZURE_CLIENT_SECRET,\r\n//       },\r\n//     });\r\n\r\n   \r\n//     // let transporter = nodemailer.createTransport({\r\n//     //     service: \"smtp.office365.com\",\r\n//     //     auth: {\r\n//     //       type: \"OAuth2\",\r\n//     //       user: process.env.EMAIL,\r\n//     //       pass: process.env.OUTLOOKWORD,\r\n//     //       clientId: process.env.AZURE_CLIENT_ID,\r\n//     //       clientSecret: process.env.AZURE_CLIENT_SECRET,\r\n//     //       refreshToken: process.env.OAUTH_REFRESH_TOKEN,\r\n//     //     },\r\n//     //    });\r\n//     // Send a test email\r\n//     const testEmailOptions = {\r\n//       from: process.env.EMAIL,\r\n//       to: \"dhanurvedhan.c@outlook.com\", // sending to the same email as sender for testing purposes\r\n//       subject: \"Test Email\",\r\n//       text: \"This is a test email sent from your Node.js application using nodemailer and Azure OAuth2 authentication.\",\r\n//     };\r\n\r\n//     await transporter.sendMail(testEmailOptions);\r\n//     console.log(\"Test email sent successfully.\");\r\n\r\n//     return transporter;\r\n//   } catch (error) {\r\n//     console.error(\"Error creating transporter:\", error);\r\n//     throw error;\r\n//   }\r\n//     }\r\n// }\r\n// // module.exports = createTransporter;\r\n\r\n\r\n\r\n// const util = require('../util/util');\r\n\r\n// const testEmailOptions = {\r\n//     from: process.env.EMAIL,\r\n//     to: \"dhanurvedhan.c@outlook.com\", // sending to the same email as sender for testing purposes\r\n//     subject: \"Test Email\",\r\n//     text: \"This is a test email sent from your Node.js application using nodemailer and Azure OAuth2 authentication.\",\r\n//   };\r\n\r\n// module.exports = {\r\n//     outlookmail: async (req, res) => {\r\n//           util.outlookmail().then(outlooktransporter => {\r\n//             outlooktransporter.sendMail(testEmailOptions, function (err, data) {\r\n//             if (err) {\r\n//               console.log(\"Error \" + err);\r\n//             } else {\r\n//               console.log(\"Email sent successfully\");\r\n//               res.json({ status: \"Email sent to \" + testEmailOptions.to });\r\n//             }\r\n//           });\r\n//         });\r\n//     }\r\n// }\n\n//# sourceURL=webpack://sportball-sample/./controllers/outlook.js?");

/***/ }),

/***/ "./controllers/parents.js":
/*!********************************!*\
  !*** ./controllers/parents.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst parents = db.parents;\r\n\r\n\r\nmodule.exports = {\r\n    parents: async (req, res) => {\r\n      const parent = await parents.findAll();\r\n  \r\n      if (parent) {\r\n        res.status(200).json({\r\n          message: \"Fetched parents\",\r\n          category: parent,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"parent not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/parents.js?");

/***/ }),

/***/ "./controllers/payments.js":
/*!*********************************!*\
  !*** ./controllers/payments.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst payments = db.payments;\r\n\r\n\r\nmodule.exports = {\r\n    payments: async (req, res) => {\r\n      const payment = await payments.findAll();\r\n  \r\n      if (payment) {\r\n        res.status(200).json({\r\n          message: \"Fetched payments\",\r\n          category: payment,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"payment not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/payments.js?");

/***/ }),

/***/ "./controllers/product.js":
/*!********************************!*\
  !*** ./controllers/product.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst products = db.products;\r\n\r\n\r\nmodule.exports = {\r\n    products: async (req, res) => {\r\n      const product = await products.findAll();\r\n  \r\n      if (product) {\r\n        res.status(200).json({\r\n          message: \"Fetched products\",\r\n          category: product,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"product not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/product.js?");

/***/ }),

/***/ "./controllers/programs.js":
/*!*********************************!*\
  !*** ./controllers/programs.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst programs = db.programs;\r\n\r\n\r\nmodule.exports = {\r\n    programs: async (req, res) => {\r\n      const program = await programs.findAll();\r\n  \r\n      if (program) {\r\n        res.status(200).json({\r\n          message: \"Fetched programs\",\r\n          category: program,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Program not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/programs.js?");

/***/ }),

/***/ "./controllers/registrations.js":
/*!**************************************!*\
  !*** ./controllers/registrations.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst registrations = db.registrations;\r\n\r\n\r\nmodule.exports = {\r\n    registrations: async (req, res) => {\r\n      const registration = await registrations.findAll();\r\n  \r\n      if (registration) {\r\n        res.status(200).json({\r\n          message: \"Fetched registrations\",\r\n          category: registration,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"registration not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/registrations.js?");

/***/ }),

/***/ "./controllers/seasons.js":
/*!********************************!*\
  !*** ./controllers/seasons.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst seasons = db.seasons;\r\nconst log  = __webpack_require__(/*! ../util/logger */ \"./util/logger.js\");\r\n\r\nmodule.exports = {\r\n  seasons: async (req, res) => {\r\n    try {\r\n      const allusers = await seasons.findAll({\r\n        attributes: ['id', 'season_name', 'season_start_month'],\r\n      });\r\n\r\n      if (allusers) {\r\n          res.status(200).json({\r\n          message: \"Fetched seasons\",\r\n          category: allusers,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"Seasons not found\",\r\n        });\r\n      }\r\n    } catch (error) {\r\n      // Handle the error\r\n     log.logError(error, 'Error fetching seasons');\r\n            if (error.name === 'SequelizeDatabaseError') {\r\n        res.status(500).json({\r\n          message: \"Database error occurred\",\r\n        });\r\n      } else {\r\n        res.status(500).json({\r\n          message: \"Internal server error\",\r\n        });\r\n      }\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./controllers/seasons.js?");

/***/ }),

/***/ "./controllers/sendEmail.js":
/*!**********************************!*\
  !*** ./controllers/sendEmail.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const util = __webpack_require__(/*! ../util/util */ \"./util/util.js\");\r\nconst logger = __webpack_require__(/*! ../util/logger */ \"./util/logger.js\"); // Importing the logger module\r\n\r\nmodule.exports = {\r\n    sendBulkEmail: async (req, res) => {\r\n        // Assuming req.body contains an array of recipients and a common URL for all emails\r\n        const { recipients, url } = req.body;\r\n\r\n        // Ensure recipients and URL are provided\r\n        if (!Array.isArray(recipients) || recipients.length === 0 || !url) {\r\n            return res.status(400).json({ error: \"Both 'recipients' (as an array) and 'url' are required.\" });\r\n        }\r\n\r\n        // Constructing mail options with dynamic values\r\n        const mailOptionsList = recipients.map(to => ({\r\n            from: \"dhanurvedhan082@gmail.com\",\r\n            to: to,\r\n            subject: \"Nodemailer API\",\r\n            text: `Hi from your nodemailer API. You can access the application here: ${url}`,\r\n        }));\r\n\r\n        // Sending bulk emails\r\n        try {\r\n            const transporter = await util.mailFunction();\r\n            const promises = mailOptionsList.map((mailOptions, index) => new Promise((resolve, reject) => {\r\n                setTimeout(() => {\r\n                    transporter.sendMail(mailOptions, function (err, data) {\r\n                        if (err) {\r\n                            // Log the error\r\n                            logger.logError(err, `Error sending email to ${mailOptions.to}`);\r\n                            reject(err);\r\n                        } else {\r\n                            console.log(\"Email sent successfully to \" + mailOptions.to);\r\n                            resolve();\r\n                        }\r\n                    });\r\n                }, index * 500); // Delay each email by 5 seconds\r\n            }));\r\n\r\n            await Promise.all(promises);\r\n            res.json({ status: \"Bulk emails sent successfully.\" });\r\n        } catch (error) {\r\n            logger.logError(error, `Error sending Bulk Email`);\r\n            res.status(500).json(\"Failed to send bulk emails.\" );\r\n        }\r\n    }\r\n    \r\n}\n\n//# sourceURL=webpack://sportball-sample/./controllers/sendEmail.js?");

/***/ }),

/***/ "./controllers/states.js":
/*!*******************************!*\
  !*** ./controllers/states.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst states = db.states;\r\n\r\n\r\nmodule.exports = {\r\n    states: async (req, res) => {\r\n      const state = await states.findAll();\r\n  \r\n      if (state) {\r\n        res.status(200).json({\r\n          message: \"Fetched states\",\r\n          category: state,\r\n        });\r\n      } else {\r\n        res.status(404).json({\r\n          message: \"state not Found\",\r\n        });\r\n      }\r\n    },\r\n  };\r\n  \n\n//# sourceURL=webpack://sportball-sample/./controllers/states.js?");

/***/ }),

/***/ "./middlewares/auth.js":
/*!*****************************!*\
  !*** ./middlewares/auth.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\r\nconst Auth0Strategy = __webpack_require__(/*! passport-auth0 */ \"passport-auth0\");\r\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nconst db = __webpack_require__(/*! ../models */ \"./models/index.js\");\r\nconst users = db.allusers;\r\n\r\n\r\ndotenv.config();\r\n\r\nconst strategy = new Auth0Strategy({\r\n    domain: 'dev-3s0j68qpfmtfkc23.us.auth0.com',\r\n    clientID: '8OFdywSeBqFb0o0Bx8Gm2d0RZDejq09y',\r\n    clientSecret: '_m1VG6NwxORJPd7E4-5mtoLgzoHhOaHCm4Z1kDmjXNQYRty6WCY8FAuE0yiL5Pzq',\r\n    callbackURL: 'http://localhost:3002/callback'\r\n}, async (accessToken, refreshToken, extraParams, profile, done) => {\r\n    const profile_id = profile.id;\r\n    const profile_name = profile._json.name !== '' ? profile._json.name : profile._json.nickname;\r\n\r\n    try {\r\n        let user = await users.findOne({ where: { auth_id: profile_id } });\r\n        console.log(profile);\r\n        if (!user) {\r\n            user = await users.create({\r\n                auth_id: profile_id,\r\n                email: profile_name,\r\n            });\r\n        }\r\n\r\n        // Pass the user object to done\r\n        return done(null, user);\r\n    } catch (error) {\r\n        return done(error);\r\n    }\r\n});\r\n\r\npassport.serializeUser((user, done) => {\r\n    done(null, user.id);\r\n});\r\n\r\npassport.deserializeUser((id, done) => {\r\n    return done(null, id);\r\n});\r\n\r\npassport.use(strategy);\r\n\r\nmodule.exports = passport;\r\n\n\n//# sourceURL=webpack://sportball-sample/./middlewares/auth.js?");

/***/ }),

/***/ "./middlewares/authenticate.js":
/*!*************************************!*\
  !*** ./middlewares/authenticate.js ***!
  \*************************************/
/***/ ((module) => {

eval("\r\nmodule.exports = {\r\n ensureAuthenticated: async (req, res, next) => {\r\n    if (req.isAuthenticated()) {\r\n        // console.log(req.user);\r\n        return next(); \r\n    }\r\n    res.redirect('/login'); \r\n}\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://sportball-sample/./middlewares/authenticate.js?");

/***/ }),

/***/ "./models/allusers.model.js":
/*!**********************************!*\
  !*** ./models/allusers.model.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n\r\n    const AllUser = sequelize.define('all_user', {\r\n      auth_id: {\r\n        type: DataTypes.STRING,\r\n        allowNull: false,\r\n      },\r\n      email: {\r\n        type: DataTypes.STRING,\r\n        allowNull: false,\r\n      },\r\n          }, { \r\n            tableName: 'all_user' ,\r\n          });\r\n (async () => {\r\n    // try {\r\n    //   await AllUser.sync({ alter: true });\r\n    //   console.log(\"Table structure updated successfully.\");\r\n    // } catch (error) {\r\n    //   console.error(\"Error updating table structure:\", error);\r\n    // } finally {\r\n    //   // Close the Sequelize connection\r\n    //   //  Sequelize.close();\r\n    // }\r\n  })();\r\n          return AllUser;\r\n}\n\n//# sourceURL=webpack://sportball-sample/./models/allusers.model.js?");

/***/ }),

/***/ "./models/children.model.js":
/*!**********************************!*\
  !*** ./models/children.model.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const children = sequelize.define(\r\n    \"children\",\r\n    {\r\n      child_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      child_dob: {\r\n        type: DataTypes.DATE,\r\n        allowNull: false,\r\n      },\r\n      child_age: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    }   ,\r\n    {\r\n      tableName: \"children\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n\r\n  return children;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/children.model.js?");

/***/ }),

/***/ "./models/cities.model.js":
/*!********************************!*\
  !*** ./models/cities.model.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const cities = sequelize.define(\r\n    \"cities\",\r\n    {\r\n      city_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"cities\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n//  (async () => {\r\n//     try {\r\n//       await cities.sync({ alter: true });\r\n//       console.log(\"Table structure updated successfully.\");\r\n//     } catch (error) {\r\n//       console.error(\"Error updating table structure:\", error);\r\n//     } finally {\r\n//       // Close the Sequelize connection\r\n//       //  Sequelize.close();\r\n//     }\r\n//   })();\r\n  return cities;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/cities.model.js?");

/***/ }),

/***/ "./models/countries.model.js":
/*!***********************************!*\
  !*** ./models/countries.model.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const countries = sequelize.define(\r\n    \"countries\",\r\n    {\r\n      country_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"countries\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n\r\n  return countries;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/countries.model.js?");

/***/ }),

/***/ "./models/discounts.model.js":
/*!***********************************!*\
  !*** ./models/discounts.model.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const discounts = sequelize.define(\r\n    \"discounts\",\r\n    {\r\n      discount_code: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      discount_amount: {\r\n        type: DataTypes.FLOAT,\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"discounts\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n  // (async () => {\r\n  //   try {\r\n  //     await discounts.sync({ alter: true });\r\n  //     console.log(\"Table structure updated successfully.\");\r\n  //   } catch (error) {\r\n  //     console.error(\"Error updating table structure:\", error);\r\n  //   } finally {\r\n  //     // Close the Sequelize connection\r\n  //     //  Sequelize.close();\r\n  //   }\r\n  // })();\r\n  return discounts;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/discounts.model.js?");

/***/ }),

/***/ "./models/index.js":
/*!*************************!*\
  !*** ./models/index.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Sequelize, DataTypes } = __webpack_require__(/*! sequelize */ \"sequelize\");\r\nconst sequelize = __webpack_require__(/*! ../util/database */ \"./util/database.js\");\r\n\r\nconst db = {};\r\n\r\nconst allusers = __webpack_require__(/*! ./allusers.model */ \"./models/allusers.model.js\")(sequelize);\r\nconst seasons = __webpack_require__(/*! ./seasons.model */ \"./models/seasons.model.js\")(sequelize);\r\nconst cities = __webpack_require__(/*! ./cities.model */ \"./models/cities.model.js\")(sequelize);\r\nconst states = __webpack_require__(/*! ./states.model */ \"./models/states.model.js\")(sequelize);\r\nconst countries = __webpack_require__(/*! ./countries.model */ \"./models/countries.model.js\")(sequelize);\r\nconst parents = __webpack_require__(/*! ./parents.model */ \"./models/parents.model.js\")(sequelize);\r\nconst children = __webpack_require__(/*! ./children.model */ \"./models/children.model.js\")(sequelize);\r\n// const participation = require(\"./participation.model\")(sequelize);\r\nconst registrations = __webpack_require__(/*! ./registrations.model */ \"./models/registrations.model.js\")(sequelize);\r\nconst payments = __webpack_require__(/*! ./payments.model */ \"./models/payments.model.js\")(sequelize);\r\nconst discounts = __webpack_require__(/*! ./discounts.model */ \"./models/discounts.model.js\")(sequelize);\r\nconst products = __webpack_require__(/*! ./products.model */ \"./models/products.model.js\")(sequelize); \r\nconst merchants = __webpack_require__(/*! ./merchants.model */ \"./models/merchants.model.js\")(sequelize);\r\nconst programs = __webpack_require__(/*! ./programs.model */ \"./models/programs.model.js\")(sequelize);\r\n\r\ndb.Sequelize = Sequelize;\r\ndb.sequelize = sequelize;\r\n\r\ndb.allusers = allusers;\r\ndb.seasons = seasons;\r\ndb.cities = cities;\r\ndb.states = states;\r\ndb.countries = countries;\r\ndb.parents = parents;\r\ndb.children = children;\r\n// db.participation = participation;\r\ndb.registrations = registrations;\r\ndb.payments = payments;\r\ndb.discounts = discounts;\r\ndb.products = products;\r\ndb.merchants = merchants;\r\ndb.programs = programs;\r\n\r\n// ------------Defining relations----------\r\n\r\n\r\n// cities.hasMany(programs, {\r\n//   as: \"cityId\",\r\n//   foreignKey: { allowNull: false },\r\n// });\r\n\r\n//------------child table------------\r\nparents.hasMany(children, {\r\n  // as: \"parentId\",\r\n  foreignKey: { allowNull: false },\r\n});\r\nchildren.belongsTo(parents, {\r\n  // as: \"parent_city\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n//------------parents table------------\r\n\r\nparents.belongsTo(cities, {\r\n  // as: \"parent_city\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nparents.belongsTo(states, {\r\n  // as: \"parent_state\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nparents.belongsTo(countries, {\r\n  // as: \"parent_country\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\n//------------participation table------------\r\n// children.hasMany(participation, {\r\n//   as: \"child_id\",\r\n//   foreignKey: { allowNull: false },\r\n// });\r\n\r\n// seasons.hasMany(participation, {\r\n//   as: \"season_id\",\r\n//   foreignKey: { allowNull: false },\r\n// });\r\n\r\n//------------cities table------------\r\nstates.hasMany(cities, {\r\n  // as:'state_id',\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\n//------------states table------------\r\ncountries.hasMany(states, {\r\n  // as:'country_id',\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\n// parents.hasMany(registrations, {\r\n//   as: 'parent_id',\r\n//   foreignKey: { allowNull: false },\r\n// });\r\n\r\n//------------registration table------------\r\nregistrations.belongsTo(children, {\r\n  // as: 'child_id',\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nregistrations.belongsTo(seasons, {\r\n  // as: \"season_id\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nregistrations.belongsTo(payments, {\r\n  // as: \"payment_id\",\r\n  foreignKey: {allowNull: false},\r\n});\r\n\r\nprograms.hasMany(registrations, {\r\n  // as: \"payment_id\",\r\n  foreignKey: {allowNull: false},\r\n});\r\n// registrations.belongsTo(seasons, {\r\n//   as: \"season_id\",\r\n//   foreignKey: {allowNull: false},\r\n// });\r\n\r\n//------------payments table------------\r\ndiscounts.hasMany(payments, {\r\n  // as: \"discount_id\",\r\n  // foreignKey: { allowNull: false },\r\n});\r\n\r\n//------------products table------------\r\nproducts.belongsTo(programs, {\r\n  // as:\"program_id\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nproducts.belongsTo(merchants, {\r\n  // as: \"merchant_id\",\r\n  foreignKey: {allowNull: false },\r\n});\r\n\r\n//------------programs table------------\r\nprograms.belongsTo(cities, {\r\n  // as: \"program_city\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nprograms.belongsTo(states, {\r\n  // as: \"program_state\",\r\n  foreignKey: {allowNull: false },\r\n});\r\n\r\nprograms.belongsTo(countries, {\r\n  // as: \"program_country\",\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nprograms.belongsTo(seasons, {\r\n  foreignKey: { allowNull: false },\r\n});\r\n\r\nmodule.exports = db;\n\n//# sourceURL=webpack://sportball-sample/./models/index.js?");

/***/ }),

/***/ "./models/merchants.model.js":
/*!***********************************!*\
  !*** ./models/merchants.model.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const merchants = sequelize.define(\r\n    \"merchants\",\r\n    {\r\n      merchant_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"merchants\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n\r\n  return merchants;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/merchants.model.js?");

/***/ }),

/***/ "./models/parents.model.js":
/*!*********************************!*\
  !*** ./models/parents.model.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const parents = sequelize.define(\r\n    \"parents\",\r\n    {\r\n      parent_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      parent_email: {\r\n        type: DataTypes.STRING(50),\r\n      },\r\n      parent_mobile: {\r\n        type: DataTypes.DOUBLE,\r\n        allowNull: false,\r\n      },\r\n      parent_street_address: {\r\n        type: DataTypes.STRING(50),\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"parents\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n\r\n  return parents;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/parents.model.js?");

/***/ }),

/***/ "./models/payments.model.js":
/*!**********************************!*\
  !*** ./models/payments.model.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const payments = sequelize.define(\r\n    \"payments\",\r\n    {\r\n      payment_amount: {\r\n        type: DataTypes.FLOAT,\r\n        allowNull: false,\r\n      },\r\n      payment_status: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      payment_transaction_number: {\r\n        type: DataTypes.DOUBLE,\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"payments\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n  // (async () => {\r\n  //   try {\r\n  //     await payments.sync({ alter: true });\r\n  //     console.log(\"Table structure updated successfully.\");\r\n  //   } catch (error) {\r\n  //     console.error(\"Error updating table structure:\", error);\r\n  //   } finally {\r\n  //     // Close the Sequelize connection\r\n  //     //  Sequelize.close();\r\n  //   }\r\n  // })();\r\n  return payments;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/payments.model.js?");

/***/ }),

/***/ "./models/products.model.js":
/*!**********************************!*\
  !*** ./models/products.model.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const products = sequelize.define(\r\n    \"products\",\r\n    {\r\n      product_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      product_price: {\r\n        type: DataTypes.FLOAT,\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"products\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n\r\n  return products;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/products.model.js?");

/***/ }),

/***/ "./models/programs.model.js":
/*!**********************************!*\
  !*** ./models/programs.model.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const programs = sequelize.define(\r\n    \"programs\",\r\n    {\r\n       program_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      program_description: {\r\n        type: DataTypes.STRING(50),\r\n      },\r\n      program_image: {\r\n        type: DataTypes.STRING(50),\r\n      },\r\n      program_season: {\r\n        type: DataTypes.TEXT,\r\n        allowNull: false,\r\n      },\r\n      program_price: {\r\n        type: DataTypes.FLOAT,\r\n        allowNull: false,\r\n      },\r\n      program_days: {\r\n        type: DataTypes.TEXT,\r\n        allowNull: false,\r\n      },\r\n      program_age_category: {\r\n        type: DataTypes.STRING,\r\n        allowNull: false,\r\n      },\r\n      program_no_of_classes: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      program_duration: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      program_venue: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      program_street_address: {\r\n        type: DataTypes.STRING(50),\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"programs\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n  //  (async () => {\r\n  //     try {\r\n  //       await programs.sync({ alter: true });\r\n  //       console.log(\"Table structure updated successfully.\");\r\n  //     } catch (error) {\r\n  //       console.error(\"Error updating table structure:\", error);\r\n  //     } finally {\r\n  //       // Close the Sequelize connection\r\n  //       //  Sequelize.close();\r\n  //     }\r\n  //   })();\r\n\r\n  return programs;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/programs.model.js?");

/***/ }),

/***/ "./models/registrations.model.js":
/*!***************************************!*\
  !*** ./models/registrations.model.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const registrations = sequelize.define(\r\n    \"registrations\",\r\n    {\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"registrations\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n\r\n  return registrations;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/registrations.model.js?");

/***/ }),

/***/ "./models/seasons.model.js":
/*!*********************************!*\
  !*** ./models/seasons.model.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const Seasons = sequelize.define(\r\n    \"seasons\",\r\n    {\r\n      season_name: {\r\n        type: DataTypes.STRING(50),\r\n           allowNull: false\r\n      },\r\n      season_start_month: {\r\n        type: DataTypes.STRING(50),\r\n           allowNull: false\r\n      },\r\n      season_end_month: {\r\n        type: DataTypes.STRING(50),\r\n           allowNull: false\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n           allowNull: false\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      }\r\n    },\r\n    {\r\n      tableName: \"seasons\",\r\n      timestamps: true,\r\n      createdAt: 'created_at', \r\n  updatedAt: 'updated_at',\r\n      freezeTableName: true\r\n    }\r\n  );\r\n  // (async () => {\r\n  //   try {\r\n  //     await Seasons.sync({ alter: true });\r\n  //     console.log(\"Table structure updated successfully.\");\r\n  //   } catch (error) {\r\n  //     console.error(\"Error updating table structure:\", error);\r\n  //   } finally {\r\n  //     // Close the Sequelize connection\r\n  //     //  Sequelize.close();\r\n  //   }\r\n  // })();\r\n\r\n  return Seasons;\r\n};\r\n\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/seasons.model.js?");

/***/ }),

/***/ "./models/states.model.js":
/*!********************************!*\
  !*** ./models/states.model.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst DataTypes = Sequelize.DataTypes;\r\n\r\nmodule.exports = function (sequelize) {\r\n  const states = sequelize.define(\r\n    \"states\",\r\n    {\r\n      state_name: {\r\n        type: DataTypes.STRING(50),\r\n        allowNull: false,\r\n      },\r\n      created_by: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n      },\r\n      updated_by: {\r\n        type: DataTypes.INTEGER,\r\n      },\r\n    },\r\n    {\r\n      tableName: \"states\",\r\n      timestamps: true,\r\n      createdAt: \"created_at\",\r\n      updatedAt: \"updated_at\",\r\n      freezeTableName: true,\r\n    }\r\n  );\r\n\r\n  return states;\r\n};\r\n\n\n//# sourceURL=webpack://sportball-sample/./models/states.model.js?");

/***/ }),

/***/ "./router/index.js":
/*!*************************!*\
  !*** ./router/index.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\r\nconst controllers = __webpack_require__(/*! ../controllers/index */ \"./controllers/index.js\");\r\nconst passport = __webpack_require__(/*! ../middlewares/auth */ \"./middlewares/auth.js\");\r\nconst authenticate = __webpack_require__(/*! ../middlewares/authenticate */ \"./middlewares/authenticate.js\");\r\n const util = __webpack_require__(/*! ../util/util */ \"./util/util.js\");\r\n\r\n\r\n// util.mailFunction().then(transporter => {\r\n//     transporter.verify((err, success) => {\r\n//       err\r\n//         ? console.log(err)\r\n//         : console.log(`=== Server is ready to take messages: ${success} ===`);\r\n//     });\r\n//   }).catch(error => {\r\n//     console.error(\"Error in obtaining transporter:\", error);\r\n//   });\r\n\r\n// util.outlookmail().then(outlooktransporter => {\r\n//     outlooktransporter.verify((err, success) => {\r\n//       err\r\n//         ? console.log(err)\r\n//         : console.log(`=== Server is ready to take messages: ${success} ===`);\r\n//     });\r\n//   }).catch(error => {\r\n//     console.error(\"Error in obtaining transporter:\", error);\r\n//   });\r\n\r\nrouter.use(session({\r\n    secret: 'SFGG%$#974KG',\r\n    resave: true,\r\n    saveUninitialized: true\r\n}));\r\n\r\nrouter.use(passport.initialize());\r\nrouter.use(passport.session());\r\n\r\nrouter.route(\"/\").get( controllers.allusers);\r\n\r\nrouter.get('/login', passport.authenticate('auth0', {\r\n    scope: 'openid email profile'\r\n}));\r\n\r\nrouter.get('/callback', passport.authenticate('auth0', {\r\n    successRedirect: '/users',\r\n    failureRedirect: '/'\r\n}));\r\n\r\nrouter.get('/users',authenticate.ensureAuthenticated, controllers.allusers);\r\nrouter.route(\"/seasons\").get( controllers.seasons).post(controllers.addSeasons);\r\nrouter.route(\"/cities\").get(controllers.cities).post(controllers.addcities);\r\nrouter.route(\"/states\").get(controllers.states).post(controllers.addstates);\r\nrouter.route(\"/countries\").get(controllers.countries).post(controllers.addcountries);\r\nrouter.route(\"/merchants\").get(controllers.merchants).post(controllers.addmerchants);\r\nrouter.route(\"/discounts\").get(controllers.discounts).post(controllers.addDiscount);\r\nrouter.route(\"/products\").get(controllers.products).post(controllers.addProduct);\r\nrouter.route(\"/programs\").get(controllers.programs).post(controllers.addProgram);\r\nrouter.route(\"/children\").get(controllers.children).post(controllers.addchildren);\r\nrouter.route(\"/registration\").get(controllers.registrations).post(controllers.addRegistrations);\r\nrouter.route(\"/payments\").get(controllers.allPayments).post(controllers.addPayments).put(controllers.updatePayments).delete(controllers.deletePayments);\r\nrouter.route(\"/eventcount\").get(controllers.eventcount);\r\n// router.route(\"/email\").post(controllers.sendemail);\r\n// router.route(\"/outlook\").post(controllers.outlookmail);\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack://sportball-sample/./router/index.js?");

/***/ }),

/***/ "./util/database.js":
/*!**************************!*\
  !*** ./util/database.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const config = __webpack_require__(/*! ../config */ \"./config.js\");\r\n\r\nconst Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst sequelize = new Sequelize(\r\n  config.database,\r\n  config.username,\r\n  config.password,\r\n  {\r\n    host: config.host,\r\n    dialect: config.dialect,\r\n    // logging: false\r\n    // \"migrationStorage\": \"json\",\r\n    // \"migrationStoragePath\": \"migration.json\",\r\n    // \"migrationStorageTableName\": \"sample_meta\",\r\n    // \"migrationStorageTableSchema\": \"sample_schema\"\r\n    migrationStorageTableName: \"_migrations\",\r\n    // logging: false,\r\n  },\r\n\r\n);\r\n\r\nsequelize\r\n  .authenticate()\r\n  .then(() => {\r\n    console.log('Connection has been established successfully.');\r\n  })\r\n  .catch((err) => {\r\n    console.error('Unable to connect to the database:', err);\r\n  });\r\nsequelize.sync();\r\nmodule.exports = sequelize;\r\n\n\n//# sourceURL=webpack://sportball-sample/./util/database.js?");

/***/ }),

/***/ "./util/logger.js":
/*!************************!*\
  !*** ./util/logger.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const log = __webpack_require__(/*! node-file-logger */ \"node-file-logger\");\r\nconst util = __webpack_require__(/*! util */ \"util\");\r\n\r\nconst options = {\r\n    timeZone: 'Asia/Kolkata',\r\n    folderPath: './logs/',      \r\n    dateBasedFileNaming: true,\r\n    fileName: 'All_Logs',   \r\n    fileNamePrefix: 'Logs_',\r\n    fileNameSuffix: '',\r\n    fileNameExtension: '.log',     \r\n    \r\n    dateFormat: 'YYYY-MM-DD',\r\n    timeFormat: 'HH:mm:ss.SSS',\r\n    logLevel: 'debug',\r\n    onlyFileLogging: true\r\n  }\r\n   \r\n  \r\n  log.SetUserOptions(options); \r\n\r\n  function logError(error, message) {\r\n  \r\n    log.Error(message + ' | ' + util.inspect(error)); \r\n}\r\n\r\n  module.exports = {\r\n    logError: logError \r\n  };\n\n//# sourceURL=webpack://sportball-sample/./util/logger.js?");

/***/ }),

/***/ "./util/util.js":
/*!**********************!*\
  !*** ./util/util.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\r\nconst { ClientSecretCredential } = __webpack_require__(/*! @azure/identity */ \"@azure/identity\");\r\n\r\n\r\nconst mailFunction = async () =>{\r\n    // console.log(process.env.EMAIL);\r\n\r\nlet transporter = nodemailer.createTransport({\r\n  service: \"gmail\",\r\n  auth: {\r\n    type: \"OAuth2\",\r\n    user: process.env.EMAIL,\r\n    pass: process.env.WORD,\r\n    clientId: process.env.OAUTH_CLIENTID,\r\n    clientSecret: process.env.OAUTH_CLIENT_SECRET,\r\n    refreshToken: process.env.OAUTH_REFRESH_TOKEN,\r\n  },\r\n });\r\n return transporter;\r\n};\r\n\r\n\r\nconst outlookmail = async () =>{\r\n        const credentials = new ClientSecretCredential(\r\n          process.env.AZURE_TENANT_ID,\r\n          process.env.AZURE_CLIENT_ID,\r\n          process.env.AZURE_CLIENT_SECRET,\r\n          { tenantId: process.env.AZURE_TENANT_ID, username: process.env.OUTLOOKEMAIL }\r\n        );\r\n    \r\n        const tokenCredential = await credentials.getToken(\"https://outlook.office365.com/.default\");\r\n         console.log(tokenCredential);\r\n    \r\n        const outlooktransporter = nodemailer.createTransport({\r\n          host: \"smtp.office365.com\",\r\n          port: 587,\r\n          secure: false,\r\n          auth: {\r\n            type: \"OAuth2\",\r\n            user: process.env.OUTLOOKEMAIL,\r\n            accessToken: tokenCredential.token,\r\n            clientId: process.env.AZURE_CLIENT_ID,\r\n            clientSecret: process.env.AZURE_CLIENT_SECRET,\r\n          },\r\n        });    \r\n    \r\n        return outlooktransporter;\r\n        };\r\n\r\nmodule.exports = {\r\n    mailFunction,\r\n    outlookmail\r\n}\n\n//# sourceURL=webpack://sportball-sample/./util/util.js?");

/***/ }),

/***/ "@azure/identity":
/*!**********************************!*\
  !*** external "@azure/identity" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@azure/identity");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-session");

/***/ }),

/***/ "node-file-logger":
/*!***********************************!*\
  !*** external "node-file-logger" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node-file-logger");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("passport");

/***/ }),

/***/ "passport-auth0":
/*!*********************************!*\
  !*** external "passport-auth0" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("passport-auth0");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("sequelize");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;