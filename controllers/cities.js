const db = require("../models");
const cities = db.cities;
const log  = require('../util/logger');

module.exports = {
  cities: async (req, res) => {
    try {

      const city = await cities.findAll();

      if (city) {
        res.status(200).json({
          message: "Fetched cities",
          category: city,
        });
      } else {
        res.status(404).json({
          message: "city not Found",
        });
      }
    } catch (error) {
      if (error.name === "SequelizeDatabaseError") {
        log.logError(error, "Database error occurred");
        res.status(500).json({
          message: "Database error occurred",
        });
      } else {
        log.logError(error, "Error fetching cities");
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  },
};
