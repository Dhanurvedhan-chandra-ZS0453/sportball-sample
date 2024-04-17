const db = require("../models");
const programs = db.programs;

module.exports = {
  addProgram: async (req, res) => {
    const { program_name, program_description, program_image, program_season, program_price, program_days,
        program_no_of_classes, program_duration, program_venue, program_street_address, cityId,
        stateId, countryId, seasonId, created_by, program_age_category } =
      req.body;
    try {
      const newPrograms = await programs.create({
        program_name,   
        program_description,
        program_image,
        program_season,
        program_price,
        program_days,
        program_no_of_classes,
        program_duration,
        program_venue,
        program_street_address,
        cityId,
        stateId,
        countryId,
        seasonId,
        created_by,
        program_age_category,
      });

      if (newPrograms) {
        res.status(200).json({
          message: "Program added successfully",
          season: newPrograms,
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
