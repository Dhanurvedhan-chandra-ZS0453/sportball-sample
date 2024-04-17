const db = require("../models");
const seasons = db.seasons;
const log  = require('../util/logger');

module.exports = {
  seasons: async (req, res) => {
    try {
      const allusers = await seasons.findAll({
        attributes: ['id', 'season_name', 'season_start_month'],
      });

      if (allusers) {
          res.status(200).json({
          message: "Fetched seasons",
          category: allusers,
        });
      } else {
        res.status(404).json({
          message: "Seasons not found",
        });
      }
    } catch (error) {
      // Handle the error
     log.logError(error, 'Error fetching seasons');
            if (error.name === 'SequelizeDatabaseError') {
        res.status(500).json({
          message: "Database error occurred",
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  },
};
