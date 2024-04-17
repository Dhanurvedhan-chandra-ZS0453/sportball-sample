const db = require("../models");
const seasons = db.seasons;

module.exports = {
  addSeasons: async (req, res) => {
    const { season_name, season_start_month, season_end_month, created_by } =
      req.body;
    try {
      const newSeason = await seasons.create({
        season_name,
        season_start_month,
        season_end_month,
        created_by,
      });

      if (newSeason) {
        res.status(200).json({
          message: "Season added successfully",
          season: newSeason,
        });
      } else {
        res.status(404).json({
          message: "Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  },
};
